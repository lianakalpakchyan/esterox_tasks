import bcrypt from 'bcryptjs';

const saltRounds = 10;

const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        return await bcrypt.hash(password, salt);
    } catch (error) {
        console.error(`Error hashing password: ${error}`);
        return null;
    }
};


export { hashPassword };
