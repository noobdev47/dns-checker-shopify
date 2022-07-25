import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthService from '../../../api_services/authService'
import { Button, Form, FormLayout, Heading, TextField } from '@shopify/polaris'

const LoginForm = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const [hidePassword, setHidePassword] = useState(true)

	let navigate = useNavigate()

	const handleSubmit = () => {
		setLoading(true)

		// try {
		AuthService.login({ email: email, password: password })
			.then(data => {
				setLoading(false)
				navigate('/')
			})
			.catch(err => {
				setLoading(false)
				throw err
			})
		// } catch (e) {
		// 	if (e.response.status == 422) {
		// 		ref.current.complete()
		// 		const errors = e.response.data.errors
		// 		setErrors(errors)
		// 		if (errors.hasOwnProperty('verifyEmail')) {
		// 			localStorage.setItem('user', JSON.stringify(e.response.data.user))
		// 			history.push('/email-verification')
		// 		}
		// 	} else {
		// 		setError(e)
		// 	}
		// } finally {
		// 	setLoading(false)
		// }
	}

	return (
		<div
			style={{
				width: '60%',
			}}
		>
			<Form onSubmit={handleSubmit}>
				<FormLayout>
					<TextField
						type='email'
						label='Email'
						value={email}
						onChange={newValue => setEmail(newValue)}
					/>
					<div style={{ display: 'flex', flexDirection: 'row' }}>
						<div style={{ marginRight: '5px', flexGrow: '1' }}>
							<TextField
								label='Password'
								value={password}
								type={hidePassword ? 'password' : 'text'}
								onChange={newValue => setPassword(newValue)}
							/>
						</div>
						<div style={{ height: '50%', marginTop: '5.4%' }}>
							<Button primary onClick={() => setHidePassword(!hidePassword)}>
								{hidePassword ? 'Show' : 'Hide'}
							</Button>
						</div>
					</div>

					<Button
						submit
						primary
						disabled={email === '' || password === '' || loading}
					>
						Login
					</Button>
					<div style={{ textAlign: 'center' }}>
						<Heading>
							Don't have an account? <Link to='/auth/signup'>Signup</Link>
						</Heading>
					</div>
				</FormLayout>
			</Form>
		</div>
	)
}

export default LoginForm
