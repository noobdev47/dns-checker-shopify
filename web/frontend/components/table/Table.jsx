import moment from 'moment'
import { Link } from 'react-router-dom'
import { useCallback, useState } from 'react'
import { Button, TextStyle, IndexTable } from '@shopify/polaris'

const Table = ({ dnsCheckers }) => {
	const [active, setActive] = useState(false)

	const toggleActive = useCallback(() => setActive(active => !active), [])

	const customers = [
		{
			id: '1',
			email: 'sumair@knowpakistan.net',
			spamScore: '1',
			thingsToFix: '5',
			score: 20,
			created: 'Jun 7, 2022',
			status: 'Completed',
		},
		{
			id: '2',
			email: 'muhammadsajid@knowpakistan.net',
			spamScore: '0.5',
			thingsToFix: '6',
			score: 30,
			created: 'Jul 7, 2021',
			status: 'Processing',
		},
		{
			id: '3',
			email: 'muhammadsajid@knowpakistan.net',
			spamScore: '0.5',
			thingsToFix: '6',
			score: 30,
			created: 'Jul 7, 2021',
			status: 'Processing',
		},
		{
			id: '4',
			email: 'muhammadsajid@knowpakistan.net',
			spamScore: '0.5',
			thingsToFix: '6',
			score: 30,
			created: 'Jul 7, 2021',
			status: 'Processing',
		},
	]

	const resourceName = {
		plural: 'DNS Checkers',
		singular: 'DNS Checker',
	}

	const activator = (
		<Button size='slim' onClick={toggleActive} disclosure>
			More actions
		</Button>
	)

	const rowMarkup = dnsCheckers.map(
		({ id, inbox, report, score, updated_at, is_pending }, index) => (
			<IndexTable.Row id={id} key={id} position={index}>
				<IndexTable.Cell>
					<TextStyle variation='strong'>
						<Link to={`/dnsReport/${id}`} state={report}>
							{inbox}
						</Link>
					</TextStyle>
				</IndexTable.Cell>
				<IndexTable.Cell>{score === null ? '--' : score}</IndexTable.Cell>
				<IndexTable.Cell>
					{report === null
						? '--'
						: JSON.parse(report).health_check.things_to_fix}
				</IndexTable.Cell>
				<IndexTable.Cell>
					{report === null ? '--' : JSON.parse(report).health_check.all_score}
				</IndexTable.Cell>
				<IndexTable.Cell>
					{moment(updated_at).format('MMM D,YYYY')}
				</IndexTable.Cell>
				<IndexTable.Cell>
					<TextStyle variation='strong'>
						{is_pending ? 'Processing...' : 'Completed'}
					</TextStyle>
				</IndexTable.Cell>
				<IndexTable.Cell>
					<Button destructive>Delete</Button>
				</IndexTable.Cell>
			</IndexTable.Row>
		)
	)

	return (
		<IndexTable
			selectable={false}
			resourceName={resourceName}
			itemCount={dnsCheckers.length}
			headings={[
				{ title: 'Inbox' },
				{ title: 'Spam Score' },
				{ title: 'Things to Fix' },
				{ title: 'Score' },
				{ title: 'Created' },
				{ title: 'Status' },
				{ title: 'Actions' },
			]}
		>
			{rowMarkup}
		</IndexTable>
	)
}

export default Table
