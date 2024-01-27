console.log('login.js')

const errorPara = document.getElementById('error')
const btnLogin = document.getElementById('btn-login')
btnLogin.addEventListener('click', async (event) => {

    event.preventDefault()

    console.log('login')

    const emailInput = document.getElementById('email-input')
    const passwordInput = document.getElementById('password')

    const email = emailInput.value
    const password = passwordInput.value

    if (email === '' || password == '') {

        errorPara.style.visibility = 'visible'
    } else {
        errorPara.style.visibility = 'hidden'

        try {

            const url = 'http://localhost:3000/user/login'

            // const response = await makeRequest(url, { email: data, password: password }, 'POST')

            const { token } = response
            window.localStorage.setItem('token', token)

            // window.location.replace('http://127.0.0.1:3000/home/')

            console.log('logIn: ', response)

        } catch (error) {
            console.log('logIn: ', error.message)
        }
    }
})

async function makeRequest(URL, data, type) {
    try {


        const response = await fetch(URL, {

            method: `${type}`,
            headers: {

                "Content-Type": "Application/json",
                "token": `${token}`
            }
        })

        const data = await response.json()

        return data
    } catch (error) {
        console.log('makeRequest -> ', error)

        return
    }
}
