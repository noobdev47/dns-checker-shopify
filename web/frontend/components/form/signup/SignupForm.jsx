import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthService from '../../../api_services/authService'
import {
	Button,
	Checkbox,
	Form,
	FormLayout,
	Heading,
	TextField,
} from '@shopify/polaris'

const SignupForm = () => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const [isAffiliate, setIsAffiliate] = useState(false)
	const [hidePassword, setHidePassword] = useState(true)
	const [hideConfirmPassword, setHideConfirmPassword] = useState(true)
	const [passwordConfirmation, setPasswordConfirmation] = useState('')

	let navigate = useNavigate()

	const handleSubmit = () => {
		setLoading(true)

		AuthService.register({
			name: name,
			email: email,
			password: password,
			is_affiliate: isAffiliate,
			password_confirmation: passwordConfirmation,
			timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
		})
			.then(data => {
				setLoading(false)
				navigate('/')
			})
			.catch(err => {
				setLoading(false)
				throw err
			})
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
						type='text'
						label='Name'
						value={name}
						onChange={newValue => setName(newValue)}
					/>
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

					<div style={{ display: 'flex', flexDirection: 'row' }}>
						<div style={{ marginRight: '5px', flexGrow: '1' }}>
							<TextField
								label='Confirm Password'
								value={passwordConfirmation}
								type={hideConfirmPassword ? 'password' : 'text'}
								onChange={newValue => setPasswordConfirmation(newValue)}
							/>
						</div>
						<div style={{ height: '50%', marginTop: '5.4%' }}>
							<Button
								primary
								onClick={() => setHideConfirmPassword(!hideConfirmPassword)}
							>
								{hideConfirmPassword ? 'Show' : 'Hide'}
							</Button>
						</div>
					</div>

					<Checkbox
						checked={isAffiliate}
						label='I want to be an Affiliate'
						onChange={() => setIsAffiliate(!isAffiliate)}
					/>

					<Button
						submit
						primary
						disabled={email === '' || password === '' || loading}
					>
						Signup
					</Button>
					<div style={{ textAlign: 'center' }}>
						<Heading>
							Already have an account? <Link to='/auth/login'>Login</Link>
						</Heading>
					</div>
				</FormLayout>
			</Form>
		</div>
	)
}

export default SignupForm
