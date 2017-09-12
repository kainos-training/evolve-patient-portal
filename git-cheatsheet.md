## Getting up to date

```
git status
```
**On branch develop**. nothing to commit, working tree clean 👌🏽

Current branch 👆🏼

```
git fetch --all
```
This will get all remote branches from the current repository. An easy way to check who is working on what.

```
From https://github.com/kainos-training/evolve-patient-portal
   151b7..a9e1d    feature/002/forgotPasswordStep1 -> origin/feature/002/forgotPasswordStep1
```
Whoever is working on **feature/002/forgotPasswordStep1** should do a **git pull** to get up to date.
If we now try **git pull origin develop** we should notice we are up to date.

Why ?
1. **git status** said nothing similar to: your branch is behind *n* commits.
2. **git fetch --all** did not fetch any updates on branch develop.

```
git pull origin develop
From https://github.com/kainos-training/evolve-patient-portal
 * branch        develop    -> FETCH_HEAD
Already up-to-date. ✅
```

## Branching off

```
git checkout -b new-branch existing-branch
```
👆🏼This will create a new (local) branch from 'existing-branch'.


```
git checkout -b new-branch
```
👆🏼This will create a new (local) branch from current branch (git status shows your branch).
Another way to check the current branch is **git branch**.
```
* develop
  feature/001/login
  feature/002/forgotPasswordStep1
  feature/003/review-medications
  feature/004/appointment-information
  master
```

To push the local branch to our remote repository, we need to use **git push -u origin new-branch**.

The **-u** (shortcut for **--set-upstream**) option is used to set this branch as the default remote tracking branch.

This allows us to use **git pull** instead of **git pull origin new-branch**. 

However, we are still required to use **git pull origin develop**, because develop is not our default remote branch (new-branch is).


## Make sure you are installing all your dependencies

Whenever you fetch (or pull) changes, it is useful to check if **package.json** file has been changed.
If yes, then you should run **npm install** or you might have compiling errors.


## Working on a new feature

Sometimes it is useful to know who is working on what branch, to be able to check their code and reuse blocks of it.

👇🏼 This shows all remote branches. 
```
git branch -r
  origin/develop
  origin/feature/001/login
  origin/feature/002/forgotPassword
  origin/feature/002/forgotPasswordStep1
  origin/feature/003/review-medications
  origin/feature/003/test
  origin/feature/004/appointment-information
  origin/master
```

## Finished working on feature

Commit your changes first.

```
git pull --rebase
```

Resolve any merge conflicts in a client version of git.
Collaborate with the other person that worked on the same file, to make sure you keep all useful changes.

```
git push OR git push origin feature/branch
```

## How rebase works

For example, develop has 3 commits today when we branch off.
Git would think our next commit will be commit number 4.

However, someone else has pushed 2 other commits during our development stage.
Our repository has 5 commits now. Also git thinks our first commit is number 4.

This is the reason why sometimes we see a message similar to: "this branch and develop have diverged."

Even if we don't have merge conflicts, we will still be required to merge branches if we try **git pull**.

If we do **git pull --rebase**, git will get and apply changes made by our team, and then it will place our changes on top.
This means, our repository will now have 5 commits from the team, our new commit being number 6 instead of 4, with no merge needed.

## File conflicts

Whenever two developers are working on the same files, they are prone to merge conflicts.
It is important to check each file manually, to make sure the code runs as expected.

Best practice is to check with the other developer and solve the merge together.

## Merging branches

If we use rebase to pull changes from develop and the rest of our team, the final merge to develop branch should be smooth.

To merge feature into develop please do the following:
```
git checkout develop
git merge feature/new-branch
git push
```

You might be required to fix a few file conflicts between merge and push.

If the feature has been fully implemented, you can consider deleting local and remote branches.

```
git branch -d old-branch
git push origin --delete old-branch
```

First command to delete local branch and second to remove remote branch.
