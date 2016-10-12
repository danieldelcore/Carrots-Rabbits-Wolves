# Carrots, Rabbits, and Wolves

:herb: :rabbit2: :wolf:

> The world is inhabited by carrots, rabbits, and wolves. Rabbits would roam this world eating carrots that grew in random patches. When they had eaten enough carrots, the rabbits would get fat and split in two. Wolves ran around eating up the rabbits; if they managed to catch and eat enough rabbits, they would also get fat and split. Rabbits and wolves within a certain distance of each other would broadcast information on food and predators. If a rabbit found a carrot patch, other rabbits would quickly join him. If a wolf found a rabbit, the pack would start chasing it.

## Initial setup
- `npm install --global gulp-cli` : Install gulp globally
- `npm i` Install dependencies

## Building for development
- `gulp dev` : Build files will be output to the '.tmp' directory.

## Building for production
- `gulp build` : Build files will be output to the 'deploy' directory.

## Pushing a new release
- `gulp build` : Compile local changes
- `git add .` : Stage changes
- `git commit -m"change description"` : comment on your changes
- `git tag -a v1.0.0 -m "Change description"` : Add a new tagged release
- `git push --follow-tags` : Push staged changes and tags
