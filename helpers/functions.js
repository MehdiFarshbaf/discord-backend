import bcrypt from 'bcrypt'

export const comparePassword = async (password, hashPassword) => {
    return await bcrypt.compare(password, hashPassword)
}

export const hashed = async string => {
    try {
        const salt = await bcrypt.genSalt(10)
        return await bcrypt.hash(string, salt)
    } catch (err) {
        console.log(err)
    }
}