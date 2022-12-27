import React from 'react'

export const PwdStrength = ({ capsLetterFlag, numberFlag, passwordLengthFlag, specialCharCheckFlag }) => {

    return (
        <>
            <p className={capsLetterFlag}> Must be 1 Capital Letter</p>
            <p className={numberFlag}> Must Contain number</p>
            <p className={passwordLengthFlag}> Must be 8 Char long</p>
            <p className={specialCharCheckFlag}> Must Contain 1 special character</p>
        </>

    )
}
export default PwdStrength;