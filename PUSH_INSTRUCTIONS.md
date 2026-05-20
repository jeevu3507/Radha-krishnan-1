# Pushing to GitHub — `jeevu3507/Radha-krishnan-1`

The sandbox where I prepared the commit has **no GitHub credentials**, so the
final `git push` has to run from your machine. Everything else is done:

- ✅ Files scaffolded
- ✅ `git init` on branch `main`
- ✅ Initial commit `26d5a45` — *"feat: initial commit — TNEMIS UAMP blueprint + project scaffold"*
- ✅ Remote `origin` set to `https://github.com/jeevu3507/Radha-krishnan-1.git`
- ⬜ Push (this is the step you run)

You have **two ways** to push. Pick whichever is easier.

---

## Option A — Push from the bundle (simplest, recommended)

A `git bundle` is a single file that carries the full repo + commit history.
It is in your outputs folder as **`uamp.bundle`**.

Open a terminal on your computer and run:

```bash
# 1. Go to a working folder of your choice
cd ~/projects        # or any folder you like

# 2. Clone from the bundle (replace <path> with where uamp.bundle is on disk)
git clone /full/path/to/uamp.bundle Radha-krishnan-1
cd Radha-krishnan-1

# 3. Replace the bundle's origin with the real GitHub remote
git remote remove origin
git remote add origin https://github.com/jeevu3507/Radha-krishnan-1.git

# 4. Push
git push -u origin main
```

GitHub will prompt for credentials:

- **Username:** `jeevu3507`
- **Password:** a **Personal Access Token (PAT)** — *not* your GitHub login
  password. GitHub stopped accepting passwords for git operations in 2021.

If you don't have a PAT yet:

1. https://github.com/settings/tokens → **Generate new token (classic)**.
2. Scope: tick `repo` (full control of private repositories).
3. Expiration: 30 or 90 days is sensible.
4. Copy the token (you only see it once).
5. Paste it when git prompts for the password.

---

## Option B — Push from the files directly (no bundle)

If you'd rather use the files already in your outputs folder:

```bash
# 1. Go to the outputs folder on your machine
cd "<path-to-your-outputs-folder>"

# 2. Remove the stale .git directory I couldn't clean from the sandbox
rm -rf .git

# 3. Initialize a fresh repo
git init -b main
git config user.email "jeevuhome@gmail.com"
git config user.name "Jeevi"

# 4. Stage everything (the .gitignore will exclude noise)
git add -A
git status

# 5. Commit
git commit -m "feat: initial commit — TNEMIS UAMP blueprint + project scaffold"

# 6. Add the remote and push
git remote add origin https://github.com/jeevu3507/Radha-krishnan-1.git
git push -u origin main
```

> **Important:** if the GitHub repo isn't empty — for example, if you ticked
> "Initialize with README" when creating it — the push will be rejected.
> Either delete the repo and recreate it empty, or run:
>
> ```bash
> git pull --rebase origin main --allow-unrelated-histories
> git push -u origin main
> ```

---

## Option C — Use the GitHub CLI (if you have `gh` installed)

```bash
cd "<path-to-your-outputs-folder>"
rm -rf .git
git init -b main
git add -A
git commit -m "feat: initial commit — TNEMIS UAMP blueprint + project scaffold"
gh auth login                                          # one-time
gh repo set-default jeevu3507/Radha-krishnan-1
git remote add origin https://github.com/jeevu3507/Radha-krishnan-1.git
git push -u origin main
```

`gh auth login` handles the PAT for you.

---

## What you should see after pushing

On GitHub, the repo should show:

```
.editorconfig
.github/
  ISSUE_TEMPLATE/
    bug_report.md
    feature_request.md
  PULL_REQUEST_TEMPLATE.md
  workflows/
    docs-lint.yml
.gitignore
CODE_OF_CONDUCT.md
CONTRIBUTING.md
LICENSE
PUSH_INSTRUCTIONS.md   ← (this file — feel free to delete after pushing)
README.md
docs/
  api/rest-conventions.md
  architecture/overview.md
  blueprint.md
  data/schema.md
  workflow/engine.md
```

Commit `26d5a45` will be the root commit on `main`.

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| `fatal: Authentication failed` | You used your GitHub password. Use a Personal Access Token instead. |
| `Updates were rejected because the remote contains work that you do not have locally` | Repo was created with a README. See the `git pull --rebase` snippet above. |
| `error: src refspec main does not match any` | You're on `master` locally. Run `git branch -M main` then push again. |
| `Permission denied (publickey)` | You used the SSH URL but have no SSH key set up. Use HTTPS or set up an SSH key. |

---

After the push succeeds, you can safely delete `uamp.bundle` and
`PUSH_INSTRUCTIONS.md` — they were transitional artifacts.
