console.log('login.js')

const errorPara = document.getElementById('error')
const btnLogin = document.getElementById('btn-login')
btnLogin.addEventListener('click', async (event) => {

    event.preventDefault()

    const emailInput = document.getElementById('email-input')
    const passwordInput = document.getElementById('password')

    const email = emailInput.value
    const password = passwordInput.value

    if (email === '' || password == '') {

        errorPara.style.visibility = 'visible'
    } else {
        errorPara.style.visibility = 'hidden'

        try {

            console.log(email, password)

            const loginURL = 'http://localhost:3000/user/login'

            const response = await makeRequest(loginURL, { email: email, password: password }, 'POST')

            if (response.flag) {

                const { token } = response
                window.localStorage.setItem('token', token)
                window.location.replace('http://127.0.0.1:3000/home/')

            } else {

                errorPara.innerHTML = response.message
                errorPara.style.visibility = 'visible'
            }

        } catch (error) {
            console.log('logIn: ', error.message)
        }
    }
})

async function makeRequest(URL, data, method) {
    try {

        console.log(data)
        const response = await fetch(URL, {

            method,
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
