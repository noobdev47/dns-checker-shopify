import { v4 as uuidv4 } from 'uuid'
import Table from '../components/table/Table'
import Filter from '../components/filter/Filter'
import { useState, useCallback, useEffect } from 'react'
import DNSCheckerService from '../api_services/DNSCheckerService'
import AddDNSCheckerModal from '../components/modal/AddDNSCheckerModal'
import { Page, Card, Button, Layout, Pagination } from '@shopify/polaris'

const DNSChecker = () => {
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

	const handleToggle = useCallback(() => setOpen(open => !open), [])
	const handleModalChange = useCallback(() => setActive(!active), [active])

	const handleFilter = async () => {
		try {
			const response = await DNSCheckerService.getDomainHealths(email)

			if (response.data.length !== 0) {
				setDnsCheckers(response.data)
				setMetaData({
					...metaData,
					total: response.total,
					per_page: response.per_page,
				})
				setActivePage(1)
			}
			// setLoading(false)
		} catch (error) {
			// setLoading(false)
		}
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

	const handleNextPage = async () => {
		try {
			const response = await DNSCheckerService.getDomainHealths(
				email,
				activePage + 1
			)

			if (response.data.length !== 0) {
				setDnsCheckers(response.data)
				setMetaData({
					...metaData,
					total: response.total,
					per_page: response.per_page,
				})
				setActivePage(activePage + 1)
			}
			setLoading(false)
		} catch (error) {
			setLoading(false)
		}
	}

	const handlePreviousPage = async () => {
		try {
			const response = await DNSCheckerService.getDomainHealths(
				email,
				activePage - 1
			)

			if (response.data.length !== 0) {
				setDnsCheckers(response.data)
				setMetaData({
					...metaData,
					total: response.total,
					per_page: response.per_page,
				})
				setActivePage(activePage - 1)
			}
			setLoading(false)
		} catch (error) {
			setLoading(false)
		}
	}

	const handleAddNewTest = async () => {
		try {
			const response = await DNSCheckerService.postRunNewTest({
				to_email: recipientEmail,
			})

			if (response.data.length !== 0) {
				setDnsCheckers(response.data)
				setMetaData({
					...metaData,
					total: response.total,
					per_page: response.per_page,
				})
				fetchData()
			}
			setLoading(false)
		} catch (error) {
			setLoading(false)
		}
	}

	const fetchData = async () => {
		try {
			const response = await DNSCheckerService.getDomainHealths(email)

			if (response.data.length !== 0) {
				setDnsCheckers(response.data)
				setMetaData({
					...metaData,
					total: response.total,
					per_page: response.per_page,
				})
			}
			setLoading(false)
		} catch (error) {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchData()
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
							handleFilter={handleFilter}
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
				recipientEmail={recipientEmail}
				copyToClipboard={copyToClipboard}
				handleAddNewTest={handleAddNewTest}
				handleModalChange={handleModalChange}
			/>
		</Page>
	)
}

export default DNSChecker
