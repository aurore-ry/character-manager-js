# Etapes pour le merge

## sur ta branche :

- git status
- git add fichiername
- git commit -m "ton message"
- git push

---

## basculement sur l'autre branche : git checkout develop

##### maintenant tu es sur la branche develop

## branche develop :

- git status
- git pull (si tu n'es pas à jour)
- git merge phil
- git status
- ls -lah (voir les fichiers ajoutés)
- git branch -D phil (supprime la branche)
- git checkout -b phil (créer une branche qui aura le même contenu que la branche develop)
- git checkout phil (retourner sur ta branche)
