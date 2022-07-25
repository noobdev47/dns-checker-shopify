import {
	Card,
	Link,
	Stack,
	Collapsible,
	TextContainer,
	Form,
	FormLayout,
	TextField,
	Button,
} from '@shopify/polaris'

const Filter = ({
	open,
	email,
	setEmail,
	handleClear,
	handleFilter,
	handleEmailChange,
}) => {
	return (
		<Stack vertical>
			<Collapsible
				open={open}
				id='basic-collapsible'
				transition={{ duration: '500ms', timingFunction: 'ease-in-out' }}
			>
				<div
					style={{
						// width: '80%',
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'flex-end',
						justifyContent: 'flex-start',
					}}
				>
					<div style={{ marginRight: '5px' }}>
						<FormLayout>
							<TextField
								type='email'
								value={email}
								autoComplete='email'
								label='Enter Email Address'
								onChange={newValue => setEmail(newValue)}
							/>
						</FormLayout>
					</div>
					<div style={{ marginRight: '5px' }}>
						<Button primary onClick={handleFilter}>
							Filter
						</Button>
					</div>
					<Button onClick={handleClear}>Clear</Button>
				</div>
			</Collapsible>
		</Stack>
	)
}

export default Filter
