import bcrypt from 'bcryptjs'


export const encrypt = async (password) =>{
    console.log(`pass to hash: ${password}`)
    return await bcrypt.hash(password,10)
    
}

export const decrypt = async (password, hash) =>{
    return await bcrypt.compare(password,hash)
}