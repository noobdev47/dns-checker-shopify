import { useState, useCallback } from 'react'
import {
	Button,
	Modal,
	TextContainer,
	TextField,
	TextStyle,
} from '@shopify/polaris'

const AddDNSCheckerModal = ({
	copy,
	active,
	recipientEmail,
	copyToClipboard,
	handleAddNewTest,
	handleModalChange,
}) => {
	return (
		<div style={{ height: '500px' }}>
			<Modal
				open={active}
				onClose={handleModalChange}
				primaryAction={{
					content: 'Next',
					onAction: handleAddNewTest,
				}}
				secondaryActions={[
					{
						content: 'Close',
						onAction: handleModalChange,
					},
				]}
				title='Email Blacklists & DNS Checker'
			>
				<Modal.Section>
					<TextContainer>
						<p>
							Send an email to the address below, from the email you want to
							test
						</p>
						<TextStyle variation='negative'>
							<b>Send an email at the address below, then click on Next.</b>
						</TextStyle>
						<div style={{ display: 'flex', flexDirection: 'row' }}>
							<div style={{ marginRight: '5px', flexGrow: '1' }}>
								<TextField
									disabled
									readOnly
									id='copyEmail'
									autoComplete='off'
									value={recipientEmail}
								/>
							</div>
							<Button primary onClick={copyToClipboard}>
								{copy ? 'Copied to Clipboard' : 'Copy'}
							</Button>
						</div>
					</TextContainer>
				</Modal.Section>
			</Modal>
		</div>
	)
}

export default AddDNSCheckerModal
