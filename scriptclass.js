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
        const errorSPace = ' not contian space';
        const errorUpperCase = ' at least one uppercase letter';
        const errorLowerCase = ' at least one lowercase letter';
        const errorNumber = ' at least one number';
        const errorSymbol = ' at least one symbol';
        const errorLang = ' only Latin/Armenian/Russian letters';
        //const regexpPass = /^(?!.*\s)(?=.*[0-9])(?=.*[^\w\s])(?=.*[a-zа-яա-ֆ])(?=.*[A-ZА-ЯԱ—Ֆ]).*$/g;
        const regexpLang = /[^a-z0-9ա-ֆа-я\s-!"#$%&'()^*+,./:;<=>?@[\\\]_`{|}~]/gi;
        const regexpSpace = /^\S*$/g;
        const len = this.password.length;
        let errors = '';

        if (len < 8 || len > 16) {
            errors += '\n' + errorLen; 
        }

        if (regexpLang.test(this.password)) {
            errors += '\n' + errorLang;
        }

        if (!regexpSpace.test(this.password)) {
            errors += '\n' + errorSPace;
        }

        if (this.password.includes(this.username)) {
            errors += '\n' + errorKeyword;
        }

        if (!(/[A-ZА-ЯԱ—Ֆ]/g.test(this.password))) {
            errors += '\n' + errorUpperCase;
        }

        if (!(/[a-zа-яա-ֆ]/g.test(this.password))) {
            errors += '\n' + errorLowerCase;
        }

        if (!(/\d/g.test(this.password))) {
            errors += '\n' + errorNumber;
        }

        if (!(/[-!"#$%&'()^*+,./:;<=>?@[\\\]_`{|}~]/g.test(this.password))) {
            errors += '\n' + errorSymbol;
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
            let errorTextUser = document.querySelector('#errorU');
            errorTextUser.innerHTML = error;
        }

        if (resultPass !== '') {
            error = 'The Password must contain:' + resultPass;
            let errorTextPass = document.querySelector('#errorP');
            errorTextPass.innerHTML = error;
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
        document.querySelector('#errorU').innerHTML = 'Please fill in all fields';
        throw new Error('fields are blank')
    }

    signup.main();
}

reset.onclick = function (event) {
    window.location.reload();
}
























