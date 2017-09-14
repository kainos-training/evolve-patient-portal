import { ChangeDetectorRef, Component, Directive, ElementRef, HostListener, Input, OnInit, TemplateRef } from '@angular/core';
import {isNumber} from 'util';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { DataService } from '../../services/data.service';

@Component({
    selector: 'evolve-questionnaire',
    templateUrl: './questionnaire.component.html',
    styleUrls: ['./questionnaire.component.css']
})
@Directive({
    selector: '[onReturn]'
})
export class QuestionnaireComponent implements OnInit {

    private componentHeight;
    private sections = ['Patient Details', 'Next of Kin', 'GP Details', 'Do you currently have or have you ever been diagnosed with:', 'Female patients'];
    private answers;
    private taskID;
    private currentTabIndex;
    private minIndex;
    private maxIndex;
    public modalRef: BsModalRef;
    private firstInvalidInput;

    private sectionInfo = {
        'Patient Details': "Press ENTER to navigate.",
        'Do you currently have or have you ever been diagnosed with:': "Press ENTER to navigate, SPACE to tick.",
    };

    private questions = {
        'Patient Details': [
            {
                q: 'Surname',
                mandatory: 'required',
                id: 1
            },
            {
                q: 'Firstname',
                mandatory: 'required',
                id: 2
            },
            {
                q: 'Address line 1',
                mandatory: 'required',
                id: 3
            },
            {
                q: 'Address Line 2',
                id: 4
            },
            {
                q: 'Postcode',
                id: 5,
                mandatory: 'required',
            },
            {
                q: 'D.O.B.',
                id: 6,
                mandatory: 'required',
            },
            {
                q: 'Sex',
                id: 7,
                mandatory: 'required',
            },
            {
                q: 'Age',
                id: 8,
                mandatory: 'required',
            },
            {
                q: 'Telephone number',
                id: 9,
                mandatory: 'required',
            },
            {
                q: 'Occupation',
                id: 10,
                mandatory: 'required',
            },
            {
                q: 'Religion',
                id: 11,
                mandatory: 'required',
            },
        ],
        'Next of Kin': [
            {
                q: 'Full Name',
                mandatory: 'required',
                id: 12
            },
            {
                q: 'Address line 1',
                mandatory: 'required',
                id: 13
            },
            {
                q: 'Address Line 2',
                id: 14
            },
            {
                q: 'Postcode',
                id: 15,
                mandatory: 'required',
            },
            {
                q: 'Relationship',
                id: 16,
                mandatory: 'required',
            },
            {
                q: 'Telephone number',
                id: 17,
                mandatory: 'required',
            },
        ],
        'GP Details': [
            {
                q: 'Full Name',
                mandatory: 'required',
                id: 18,
            },
            {
                q: 'Practice address line 1',
                mandatory: 'required',
                id: 19
            },
            {
                q: 'Practice address Line 2',
                id: 20
            },
            {
                q: 'Practice Postcode',
                id: 21,
                mandatory: 'required',
            },
            {
                q: 'Telephone number',
                id: 22,
                mandatory: 'required',
            },
        ],
        'Do you currently have or have you ever been diagnosed with:': [
            {
                q: 'Heart disease (incl. pacemaker)',
                id: 23,
                type: 'checkbox'
            },
            {
                q: 'MI (heart attack)',
                id: 24,
                type: 'checkbox'
            },
            {
                q: 'Hypertension (high blood pressure)',
                id: 25,
                type: 'checkbox'
            },
            {
                q: 'Angina (chest pain)',
                id: 26,
                type: 'checkbox'
            },
            {
                q: 'DVT/PE (blood clots)',
                id: 27,
                type: 'checkbox'
            },
            {
                q: 'Stroke (CVA/TIA)',
                id: 28,
                type: 'checkbox'
            },
            {
                q: 'Diabetes type 1 / type 2',
                id: 29,
                type: 'checkbox'
            },
            {
                q: 'Epilepsy',
                id: 30,
                type: 'checkbox'
            },
            {
                q: 'Jaundice',
                id: 31,
                type: 'checkbox'
            },
            {
                q: 'Gastric acidity, hiatus hernia, Irritable bowel ',
                id: 32,
                type: 'checkbox'
            },
            {
                q: 'Kidney disease',
                id: 33,
                type: 'checkbox'
            },
            {
                q: 'Arthritis',
                id: 34,
                type: 'checkbox'
            },
            {
                q: 'Asthma',
                id: 35,
                type: 'checkbox'
            },
            {
                q: 'Chronic respiratory disease',
                id: 36,
                type: 'checkbox'
            },
            {
                q: 'Thyroid disorders',
                id: 37,
                type: 'checkbox'
            },
            {
                q: 'Have you ever been notified that you are at risk of CJD or vCJD for public health purposes?',
                id: 38,
                type: 'checkbox'
            },
            {
                q: 'Do you have any other health conditions?',
                id: 39,
            }
        ],
        'Female patients': [
            {
                q: 'Are you currently pregnant?',
                id: 40,
                type: 'checkbox'
            },
            {
                q: 'Is there a possibility you may be pregnant?',
                id: 41,
                type: 'checkbox'
            },
        ]
    };

    private el: ElementRef;
    @Input() onReturn: string;

    constructor(private dataService: DataService, private _el: ElementRef, private modalService: BsModalService, private cdRef: ChangeDetectorRef, private route: ActivatedRoute, private router: Router) {
        this.el = this._el;
        this.answers = new Array<String>();
        

        this.minIndex = 9999999;
        this.maxIndex = -1;
        for (var s = 0; s < this.sections.length; s++) {
            var localQuestions = this.questions[this.sections[s]];
            for (var q = 0; q < localQuestions.length; q++) {
                var question = localQuestions[q];
                if (this.minIndex > question.id) {
                    this.minIndex = question.id;
                }
                if (this.maxIndex < question.id) {
                    this.maxIndex = question.id;
                }
            }
        }
        this.firstInvalidInput = this.minIndex;
    }

    ngOnInit(): void {
        this.componentHeight = window.innerHeight + 'px';

        this.route
            .queryParams
            .subscribe(params => {
                try {
                    this.taskID = parseInt(window.atob(params['taskID']));
                    if (this.taskID > 0) {
                        console.log('Using taskID =', this.taskID);
                    } else {
                        throw 'ATOB ERROR';
                    }
                } catch (e) {
                    this.router.navigate(['/login']);
                }
            });
    }

    ngAfterViewInit() {
        const topBarHeight = $('#topBarComp').find('.left-item').outerHeight();
        const optionsBarHeight = $('div.options-bar').outerHeight();
        const windowHeight = window.innerHeight;

        if (isNumber(topBarHeight) && isNumber(optionsBarHeight) && isNumber(windowHeight)) {
            this.componentHeight = (window.innerHeight - topBarHeight - optionsBarHeight).toString() + 'px';
            this.cdRef.detectChanges();
        }
        $('input').first().focus();
    }

    @HostListener('keydown', ['$event'])
    onKeyDown(e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode == 9 || keyCode == 13) {
            e.preventDefault();
            this.doNext(e);

            return;
        }
    }

    private focusFunction(e) {
        this.currentTabIndex = e.srcElement.tabIndex;
        this.cdRef.detectChanges();
    }

    private doPrevious(e) {
        var index = e.srcElement.tabIndex;
        if (index > this.minIndex) {
            index--;
        }
        $('input[tabindex=' + index + ']').focus();
    }

    private doNext(e) {
        var index = e.srcElement.tabIndex;
        if (index <= this.maxIndex) {
            index++;
        }
        $('input[tabindex=' + index + ']').focus();
    }

    private getAnswers(): String[] {
        var list = new Array<String>();
        for (var s = 0; s < this.sections.length; s++) {
            var localQuestions = this.questions[this.sections[s]];
            for (var q = 0; q < localQuestions.length; q++) {
                var question = localQuestions[q];
                var answer;
                if (question.type) {
                    answer = $('input[data-element="' + question.id + '"]').is(':checked');
                } else {
                    answer = $('input[data-element="' + question.id + '"]').val();
                }
                answer = answer.toString();
                list.push(answer);
            }
        }
        return list;
    }

    private doSubmit(e, template: TemplateRef<any>) {

        this.answers = this.getAnswers();
        const result = {
            taskID: this.taskID,
            answer: this.answers
        };

        this.findInvalidInputs();
        if (this.firstInvalidInput > this.maxIndex) {
            this.dataService.addQuestionnaireAnswer(result.taskID, result.answer);
            this.modalRef = this.modalService.show(template);
        } else {
            var element = document.getElementById('question-' + this.firstInvalidInput);
            var toScroll = element.offsetTop;
            const offset = 40;
            toScroll -= offset;
            $('#questionnaire').animate({scrollTop: toScroll}, 'fast');
            $(element).focus();
        }
    }

    public findInvalidInputs() {
        var first = true;
        for (var s = 0; s < this.sections.length; s++) {
            var localQuestions = this.questions[this.sections[s]];
            for (var q = 0; q < localQuestions.length; q++) {
                var question = localQuestions[q];
                var element = $('input[data-element="' + question.id + '"]');
                if (question.mandatory) {
                    var answer;
                    if (question.type) {
                        answer = $(element).is(':checked');
                        if (answer === false) {
                            if (first) {
                                this.firstInvalidInput = question.id;
                                $(element).addClass('invalid');
                                first = false;
                            }
                            $(element).addClass('invalid');
                        } else {
                            $(element).removeClass('invalid');
                        }
                    } else {
                        answer = $(element).val().toString();
                        if (answer.length == 0) {
                            if (first) {
                                this.firstInvalidInput = question.id;
                                $(element).addClass('invalid');
                                first = false;
                            }
                            $(element).addClass('invalid');
                        } else {
                            $(element).removeClass('invalid');
                        }
                    }
                }
            }
        }
        if (first) {
            this.firstInvalidInput = this.maxIndex + 1;
        }
    }

    public redirDashboard = function(){
        
        this.modalRef.hide();
        this.router.navigateByUrl("/dashboard");
    }
}
