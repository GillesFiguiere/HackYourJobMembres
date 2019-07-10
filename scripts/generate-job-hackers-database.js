const fs = require("fs")
const Ajv = require("ajv")

const profilesFolder = "job-hackers"
const targetProfilesFile = "job-hackers.json"
const schemaFileName = "scripts/member-schema.json"

const concatenateJSON = (fileName) => getJSONFromFile(`${profilesFolder}/${fileName}`)

const getJSONFromFile = (file) => {
    const fileData = fs.readFileSync(file, "utf8")
    return JSON.parse(fileData)
}

const validateProfile = (fileName) => {
    let data = null
    try {
        data = getJSONFromFile(`${profilesFolder}/${fileName}`)
    } catch (error) {
        console.error(`Exception while parsing JSON file ${profilesFolder}/${fileName} : ${error}`)
        return false
    }

    let schema = null
    try {
        schema = getJSONFromFile(schemaFileName)
    } catch (error) {
        console.error(`Exception while parsing JSON file ${schemaFileName} : ${error}`)
        return false
    }

    const ajv = new Ajv({
        allErrors: true,
        verbose: true
    })

    const valid = ajv.validate(schema, data)
    if (!valid) {
        console.error(`${fileName} is not valid:`)
        console.error(ajv.errors)
    }

    return valid
}

const validateProfiles = (files) => {
    const results = files.map(validateProfile)

    return results.filter((result) => !result).length
}

fs.readdir(profilesFolder, (error, files) => {
    console.log("Starting schema validation")
    const numberOfInvalid = validateProfiles(files)

    if(numberOfInvalid != 0) {
        console.log(`Schema validation failed with ${numberOfInvalid} profile(s) having error(s)`)
        console.log(`Execution stopped, ${targetProfilesFile} not generated`)
        return
    }
    
    console.log("Schema validation finished successfully")

    const profilesArray = files.map(concatenateJSON)
    fs.writeFile(targetProfilesFile, JSON.stringify(profilesArray), (err) => {
        if (err) throw err;
        console.log(`${targetProfilesFile} has been saved successfully`);
    })
})

