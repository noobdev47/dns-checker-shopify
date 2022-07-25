import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import Table from '../components/table/Table'
import { useNavigate } from 'react-router-dom'
import Filter from '../components/filter/Filter'
import { useState, useCallback, useEffect } from 'react'
import AddDNSCheckerModal from '../components/modal/AddDNSCheckerModal'
import { Page, Card, Button, Layout, Pagination } from '@shopify/polaris'

const HomePage = () => {
	const [email, setEmail] = useState('')
	const [open, setOpen] = useState(false)
	const [copy, setCopy] = useState(false)
	const [active, setActive] = useState(false)
	const [activePage, setActivePage] = useState(1)
	const [dnsCheckers, setDnsCheckers] = useState([])
	const [recipientEmail, setRecipientEmail] = useState(
		uuidv4() + '@inboxbetter.com'
	)
	const [metaData, setMetaData] = useState({ per_page: 0, total: 0 })

	let navigate = useNavigate()

	const handleToggle = useCallback(() => setOpen(open => !open), [])
	const handleModalChange = useCallback(() => setActive(!active), [active])

	const handleSubmit = () => {
		axios
			.post(
				'https://inboxbetter.comocrm.com/api/domain-health/test-your-email',
				{
					email: recipientEmail,
				}
			)
			.then(res => {
				console.log(res)
				handleModalChange()
				axios
					.get('https://inboxbetter.comocrm.com/api/domain-healths')
					.then(res => {
						setDnsCheckers(res.data.data)
						setMetaData({
							...metaData,
							total: res.data.total,
							per_page: res.data.per_page,
						})
					})
			})
	}

	const handleClear = () => {
		setEmail('')
		//apicall here
	}

	const copyToClipboard = () => {
		var copyText = document.getElementById('copyEmail')
		copyText.select()
		copyText.setSelectionRange(0, 99999)
		navigator.clipboard.writeText(copyText.value)
		setCopy(true)
	}

	const handleNextPage = () => {
		axios
			.get(
				`https://inboxbetter.comocrm.com/api/domain-healths?page=${
					activePage + 1
				}`
			)
			.then(res => {
				setDnsCheckers(res.data.data)
				setMetaData({
					...metaData,
					total: res.data.total,
					per_page: res.data.per_page,
				})
				setActivePage(activePage + 1)
			})
	}

	const handlePreviousPage = () => {
		axios
			.get(
				`https://inboxbetter.comocrm.com/api/domain-healths?page=${
					activePage - 1
				}`
			)
			.then(res => {
				setDnsCheckers(res.data.data)
				setMetaData({
					...metaData,
					total: res.data.total,
					per_page: res.data.per_page,
				})
				setActivePage(activePage - 1)
			})
	}

	useEffect(() => {
		if (
			localStorage.getItem('token') !== undefined &&
			localStorage.getItem('token') !== null
		) {
			axios
				.get('https://inboxbetter.comocrm.com/api/domain-healths')
				.then(res => {
					setDnsCheckers(res.data.data)
					setMetaData({
						...metaData,
						total: res.data.total,
						per_page: res.data.per_page,
					})
				})
		} else {
			navigate('/auth/login')
		}
	}, [])

	return (
		<Page
			fullWidth
			compactTitle
			primaryAction={{
				content: 'Filter',
				onAction: handleToggle,
			}}
			title='Email Blacklist & DNS Checker'
			subtitle='Check if your IPs & domains are blacklisted.
        Test your DNS settings to improve your deliverability.'
			secondaryActions={
				<Button onClick={handleModalChange}>Run a New Test</Button>
			}
		>
			<Layout>
				<Layout.Section>
					<Card sectioned>
						<Filter
							open={open}
							email={email}
							setEmail={setEmail}
							handleClear={handleClear}
							// handleSubmit={handleSubmit}
						/>
						<Table dnsCheckers={dnsCheckers} />
						<div
							style={{
								display: 'flex',
								marginTop: '10px',
								justifyContent: 'center',
							}}
						>
							<Pagination
								label={activePage}
								onNext={handleNextPage}
								hasPrevious={activePage > 1}
								onPrevious={handlePreviousPage}
								hasNext={activePage < metaData.total}
							/>
						</div>
					</Card>
				</Layout.Section>
			</Layout>
			<AddDNSCheckerModal
				copy={copy}
				active={active}
				handleSubmit={handleSubmit}
				recipientEmail={recipientEmail}
				copyToClipboard={copyToClipboard}
				handleModalChange={handleModalChange}
			/>
		</Page>
	)
}

export default HomePage
