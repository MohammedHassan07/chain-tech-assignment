console.log('create account')

const errorPara = document.getElementById('error')

const btnCreateAccount = document.getElementById('btn-create-account')
btnCreateAccount.addEventListener('click', async (event) => {

    event.preventDefault()

    console.log('clicked')

    const name = document.getElementById('name-input').value
    const email = document.getElementById('email-input').value
    const password = document.getElementById('password-input').value

    try {

        const registerURL = 'http://127.0.0.1:3000/user/register'

        const response = await makeRequest(registerURL, { name, email, password, }, 'POST')
        if (response.flag) {

            window.location.replace('http://127.0.0.1:3000/home/')
            const { token } = response
            window.localStorage.setItem('token', token)
        } else {

            errorPara.innerHTML = response.message
            errorPara.style.visibility = 'visible'
        }


    } catch (error) {
        console.log('createAccount: ', error.message)
    }

})


async function makeRequest(URL, data, method) {
    try {


        const response = await fetch(URL, {

            method: method,
            headers: {

                "Content-Type": "Application/json"
            },
            body: JSON.stringify(data)
        })

        const res = await response.json()

        return res
    } catch (error) {
        console.log('makeRequest -> ', error)

        return
    }
}