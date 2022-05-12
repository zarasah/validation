class SignupValidation {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
    checkUsername() {
        const errorLen = ' from 3 to 20 characters';
        const errorLetter = ' only Latin letters and numbers';
        const len = this.username.length;
        const regexpName = /^[a-z0-9]+$/g;
        let errors = '';

        if (len < 3 || len > 20) {
            errors += '\n' + errorLen;
        }
        
        if (!regexpName.test(this.username)) {
            errors += '\n' + errorLetter;
        }

        return errors;
    }
    checkPassword() {
        const errorLen = ' from 8 to 16 characters';
        const errorKeyword = ' not contian username';
        const errorChar = ' at least one lowercase letter,\n one uppercase letter,\n one number,\n one symbol and not contian space';
        const errorLang = ' only Latin/Armenian/Russian letters';
        //const errorSpace = 'not contian space';
        const regexpPass = /^(?!.*\s)(?=.*[0-9])(?=.*[^\w\s])(?=.*[a-zа-яա-ֆ])(?=.*[A-ZА-ЯԱ—Ֆ]).*$/g;
        const regexpLang = /[^a-z0-9ա-ֆа-я-!"#$%&'()^*+,./:;<=>?@[\\\]_`{|}~]/gi;
        //const regexpSpace = /^\S*$/g;
        const len = this.password.length;
        let errors = '';

        if (len < 8 || len > 16) {
            errors += '\n' + errorLen; 
        }

        if (regexpLang.test(this.password)) {
            errors += '\n' + errorLang;
        }

        if (this.password.includes(this.username)) {
            errors += '\n' + errorKeyword;
        }

        if (!regexpPass.test(this.password)) {
            errors += '\n' + errorChar;
        }

        return errors;
    }

    main() {
        const resultName = this.checkUsername(this.username);
        const resultPass = this.checkPassword(this.username, this.password);
        let error = '';

        if (resultName === '' && resultPass === '') {
            window.open('result.html');
        }
        
        if (resultName !== '') {
            error = 'The Username must contain:' + resultName;
            let errorTextUser = document.querySelector('#error');
            errorTextUser.innerHTML = error;
        }

        if (resultPass !== '') {
            error = 'The Password must contain:' + resultPass;
            let errorTextPass = document.createElement('pre');
            errorTextPass.innerHTML = error;
            document.querySelector('#password').after(errorTextPass);
        }
    }
}

const button = document.querySelector('#sign');
const reset = document.querySelector('#reset')

button.onclick = function(event) {
    event.preventDefault();
    const username = document.querySelector('#name').value.toLowerCase();
    const password =  document.querySelector('#password').value;
    const signup = new SignupValidation(username, password);

    if(!username || !password) {
        document.querySelector('#error').innerHTML = 'Please fill in all fields';
        throw new Error('fields are blank')
    }

    signup.main();
}

reset.onclick = function (event) {
    window.location.reload();
}
























