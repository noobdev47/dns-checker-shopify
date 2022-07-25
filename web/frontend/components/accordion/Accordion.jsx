import {
	Card,
	Icon,
	Badge,
	Stack,
	Banner,
	Heading,
	TextStyle,
	Collapsible,
} from '@shopify/polaris'
import { CircleTickOutlineMinor } from '@shopify/polaris-icons'

const Accordion = props => {
	const {
		test,
		open,
		path,
		name,
		color,
		status,
		detectedBy,
		explanation,
		statusColor,
		boldContent,
		handleToggle,
		simpleContent,
	} = props

	return (
		<Card sectioned>
			<Stack vertical>
				<div
					style={{
						display: 'flex',
						alignItems: 'flex-start',
						justifyContent: 'space-between',
					}}
				>
					<div
						onClick={handleToggle}
						style={{ flexGrow: '1', cursor: 'pointer' }}
					>
						<Heading>{name}</Heading>
					</div>
					<Badge
						status={
							statusColor === 'green'
								? 'success'
								: statusColor === 'red'
								? 'critical'
								: 'attention'
						}
					>
						<TextStyle
							variation={
								statusColor === 'green'
									? 'positive'
									: statusColor === 'red'
									? 'negative'
									: 'warning'
							}
						>
							<Heading>{status}</Heading>
						</TextStyle>
					</Badge>
				</div>
				<Collapsible
					open={open}
					id={`accordion-${name}`}
					transition={{ duration: '500ms', timingFunction: 'ease-in-out' }}
				>
					<div style={{ marginBottom: '10px' }}>
						<Banner
							title={
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									<TextStyle
										variation={
											statusColor === 'green'
												? 'positive'
												: statusColor === 'red'
												? 'negative'
												: 'warning'
										}
									>
										<Heading>{`${
											statusColor === 'green'
												? 'Test Passed - ' + boldContent
												: 'Test Failed - ' + boldContent
										}`}</Heading>
									</TextStyle>
								</div>
							}
							status={
								statusColor === 'green'
									? 'success'
									: statusColor === 'red'
									? 'critical'
									: 'warning'
							}
						/>
					</div>
					<div style={{ marginBottom: '10px' }}>
						<div style={{ marginBottom: '10px' }}>
							<Heading>Why is this important?</Heading>
						</div>
						<TextStyle>{explanation}</TextStyle>
					</div>
					{test.filter(item => item.color === 'green').length !== 0 ? (
						<div style={{ marginBottom: '10px' }}>
							<div style={{ marginBottom: '10px' }}>
								<Heading>Passing Tests:</Heading>
							</div>
							{test
								.filter(item => item.color === 'green')
								.map((singleTest, i) => (
									<Banner
										key={i}
										title={
											<div>
												<TextStyle
													variation={
														singleTest.color === 'green'
															? 'positive'
															: singleTest.color === 'yellow'
															? 'warning'
															: 'negative'
													}
												>
													<Heading>{singleTest.test_name}</Heading>
													<p>{singleTest.description}</p>
												</TextStyle>
											</div>
										}
										status={
											singleTest.color === 'green'
												? 'success'
												: singleTest.color === 'red'
												? 'critical'
												: 'warning'
										}
									/>
								))}
						</div>
					) : (
						<></>
					)}
					{test.filter(
						item =>
							item.color === 'red' ||
							item.color === 'yellow' ||
							item.color === 'block'
					).length !== 0 ? (
						<div style={{ marginBottom: '10px' }}>
							<div style={{ marginBottom: '10px' }}>
								<Heading>Problems you can fix:</Heading>
							</div>
							{test
								.filter(
									item =>
										item.color === 'red' ||
										item.color === 'yellow' ||
										item.color === 'block'
								)
								.map((singleTest, i) => (
									<Banner
										key={i}
										title={
											<div>
												<TextStyle
													variation={
														singleTest.color === 'green'
															? 'positive'
															: singleTest.color === 'yellow'
															? 'warning'
															: 'negative'
													}
												>
													<Heading>
														{'(' +
															singleTest.show_score +
															' points)  ' +
															singleTest.test_name}
													</Heading>
													<p>{singleTest.description}</p>
												</TextStyle>
											</div>
										}
										status={
											statusColor === 'green'
												? 'success'
												: statusColor === 'red'
												? 'critical'
												: 'warning'
										}
									/>
								))}
						</div>
					) : (
						<></>
					)}
					{name === 'Domain age Check' ? (
						<>
							<Heading>
								{'Your Domain name is ' + props.domain_age.domain_name}
							</Heading>
							<Heading>
								{'Your Domain creation date is ' +
									props.domain_age.domain_creation_date}
							</Heading>
							<Heading>
								{'Your Domain Age in years is ' +
									props.domain_age.domain_age_in_years +
									props.domain_age.domain_age_in_years ===
								1
									? 'year'
									: 'years'}
							</Heading>
							<Heading>
								{'Your Domain age in days is ' +
									props.domain_age.domain_age_in_days +
									' days'}
							</Heading>
						</>
					) : (
						<></>
					)}
					{name === 'Spam Assassin Check' ? (
						<>
							<Heading>Spam Score</Heading>
							<TextStyle>
								{'Your spam assassin score is ' + props.score}
							</TextStyle>
						</>
					) : (
						<></>
					)}
					{name === 'Domain Blacklist Check' ||
					name === 'IP Blacklist Check' ? (
						detectedBy !== undefined ? (
							<div
								style={{
									display: 'grid',
									gridTemplateColumns: 'auto auto auto auto auto auto auto',
								}}
							>
								{detectedBy.map((singleDetection, i) => (
									<div
										key={i}
										style={{
											padding: '10px',
											textAlign: 'center',
										}}
									>
										<Icon
											source={CircleTickOutlineMinor}
											color={
												singleDetection.blacklisted ? 'critical' : 'success'
											}
										/>
										<TextStyle
											variation={
												singleDetection.blacklisted ? 'negative' : 'positive'
											}
										>
											{singleDetection.provider}
										</TextStyle>
									</div>
								))}
							</div>
						) : (
							<></>
						)
					) : (
						<></>
					)}
				</Collapsible>
			</Stack>
		</Card>
	)
}

export default Accordion
