const { writeFile } = require('fs/promises')
const { resolve } = require('path')

const packageJSON = require('../../../package.json')

async function createPackageJSONDistVersion() {
    const {
        main,
        scripts,
        devDependencies,
        devTempBuildFolder,
        ...restOfPackageJSON
    } = packageJSON

    const packageJSONDistVersion = {
        main: main?.split('/')?.reverse()?.[0] || 'index.js',
        ...restOfPackageJSON,
    }

    try {
        console.log('Export the package.json for the dist version...')
        await writeFile(
            resolve(devTempBuildFolder, 'package.json'),
            JSON.stringify(packageJSONDistVersion, null, 2)
        )
    } catch ({ message }) {
        console.log(`
    🛑 Something went wrong!\n
      🧐 There was a problem creating the package.json dist version...\n
      👀 Error: ${message}
    `)
    }
}

createPackageJSONDistVersion()

// Also fix permissions of the app resources after building the app for distribution
require('../../utils/fixPermissions')
