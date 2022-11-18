import { BooleanValidator, StringValidator } from "../validator"
import { EmailValidator, NameValidator, PasswordValidator, UUIDValidator } from "../validator/string"

export function validateObject(param : {})
{
    const keys = Object.keys(param)
    const values = Object.values(param)
    
    const count = Object.keys(param).length

    for (let i = 0; i < count; i++)
    {
        if (keys[i] === 'email')
        {
            new EmailValidator(values[i])
        }
        else if (keys[i] === 'password')
        {
            new PasswordValidator(values[i])
        }
        else if (keys[i] === 'name' || keys[i] === 'username')
        {
            new StringValidator(values[i])
        }
        else if (keys[i].match(/^(.*?)(_id)(.*)$/gmi) || keys[i] === 'id')
        {
            new UUIDValidator(values[i])
        }
        else if (keys[i].match(/^(.*?)(_name)(.*)$/gmi))
        {
            new NameValidator(values[i])
        }
        else if (keys[i].match(/^(is_)(.*)/gmi))
        {
            new BooleanValidator(values[i])
        }
    }

    return count
}