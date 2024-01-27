console.log('create account')
// taking input on button click continue click 
const btnCreateAccount = document.getElementById('btn-create-account')
btnCreateAccount.addEventListener('click', async (event) => {

    event.preventDefault()

    console.log('clicked')

    const name = document.getElementById('name-input').value
    const countryCode = document.getElementById('select-country-code').value
    const mobile = document.getElementById('mobile-input').value
    const email = document.getElementById('email-input').value
    const password = document.getElementById('password-input').value
    const error = document.getElementById('error-box')

    try {

      
        if (response.message === 'success') {

            // window.location.replace('http://127.0.0.1:3000/home')
        }
        else {

        }


    } catch (error) {
        console.log('createAccount: ', error.message)
    }

})

