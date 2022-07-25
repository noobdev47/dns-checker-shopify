import LoginForm from '../../components/form/login/loginForm'
import { Card, Heading, Layout, Page } from '@shopify/polaris'
import SignupForm from '../../components/form/signup/SignupForm'

const Signup = () => {
	return (
		<Page fullWidth compactTitle>
			<Layout>
				<Layout.Section>
					<Card sectioned>
						<div style={{ display: 'flex', flexDirection: 'row' }}>
							<div
								style={{
									flexGrow: '1',
									display: 'flex',
									alignItems: 'center',
									flexDirection: 'column',
									justifyContent: 'center',
								}}
							>
								<a
									style={{
										display: 'flex',
										background: 'none',
										alignItems: 'center',
										justifyContent: 'center',
									}}
									href='https://inboxbetter.comocrm.com/'
								>
									<img
										alt='main logo'
										className='img-fluid'
										src='https://inboxclient.comocrm.com/assets/img/logo.png'
									/>
								</a>
								<div
									style={{
										zIndex: '1',
										display: 'flex',
										marginTop: '50px',
										algnItems: 'center',
										position: 'relative',
										justifyContent: 'center',
									}}
								>
									<div
										style={{
											zIndex: -1,
											width: '100%',
											height: '100%',
											borderRadius: '50%',
											position: 'absolute',
											background: '#ABDCFF',
										}}
									></div>
									<img
										className='img-fluid'
										src='https://inboxclient.comocrm.com/assets/img/sign-in.png'
									/>
								</div>
								<div style={{ textAlign: 'center', marginTop: '6%' }}>
									<Heading>
										Use The "Perfect Inbox" AI To Unlock Your Email
										<br />
										Deliverability, While Testing Your Email Creatives &<br />{' '}
										Avoiding The Spam Folder
									</Heading>
								</div>
							</div>
							<div
								style={{
									flexGrow: '1',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<SignupForm />
							</div>
						</div>
					</Card>
				</Layout.Section>
			</Layout>
		</Page>
	)
}

export default Signup
