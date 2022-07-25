import axios from 'axios'
import moment from 'moment'
import { useParams } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import Accordion from '../../components/accordion/Accordion'
import { Card, Heading, Page, Stack, Tabs } from '@shopify/polaris'
import DNSCheckerService from '../../api_services/dnsCheckerService'

const dnsReport = () => {
	const { id } = useParams()

	const [healthData, setHealthData] = useState({})

	const [selected, setSelected] = useState(1)
	const [openDomainBlacklistCheck, setOpenDomainBlacklistCheck] =
		useState(false)
	const [openSPFCheck, setOpenSPFCheck] = useState(false)
	const [openDKIMCheck, setOpenDKIMCheck] = useState(false)
	const [openDMARCCheck, setOpenDMARCCheck] = useState(false)
	const [openListUnsubHeaderCheck, setOpenListUnsubHeaderCheck] =
		useState(false)
	const [openHTMLBestPracticeCheck, setOpenHTMLBestPracticeCheck] =
		useState(false)
	const [openDomainAgeCheck, setOpenDomainAgeCheck] = useState(false)
	const [openShortURLsCheck, setOpenShortURLsCheck] = useState(false)
	const [openReverseDNSCheck, setOpenReverseDNSCheck] = useState(false)
	const [openIPBlacklistCheck, setOpenIPBlacklistCheck] = useState(false)
	const [openBrokenLinksCheck, setOpenBrokenLinksCheck] = useState(false)
	const [openSubjectLineCheck, setOpenSubjectLineCheck] = useState(false)
	const [openDomainSuffixCheck, setOpenDomainSuffixCheck] = useState(false)
	const [openSpamAssassinCheck, setOpenSpamAssassinCheck] = useState(false)
	const [openBlacklistedURLCheck, setOpenBlacklistedURLCheck] = useState(false)

	const handleDomainBlackListCheckToggle = useCallback(
		() =>
			setOpenDomainBlacklistCheck(
				openDomainBlacklistCheck => !openDomainBlacklistCheck
			),
		[]
	)
	const handleSpamAssassinCheckToggle = useCallback(
		() =>
			setOpenSpamAssassinCheck(openSpamAssassinCheck => !openSpamAssassinCheck),
		[]
	)
	const handleDomainAgeCheckToggle = useCallback(
		() => setOpenDomainAgeCheck(openDomainAgeCheck => !openDomainAgeCheck),
		[]
	)
	const handleDomainSuffixCheckToggle = useCallback(
		() =>
			setOpenDomainSuffixCheck(openDomainSuffixCheck => !openDomainSuffixCheck),
		[]
	)
	const handleIPBlacklistCheckToggle = useCallback(
		() =>
			setOpenIPBlacklistCheck(openIPBlacklistCheck => !openIPBlacklistCheck),
		[]
	)
	const handleShortURLsCheckToggle = useCallback(
		() => setOpenShortURLsCheck(openShortURLsCheck => !openShortURLsCheck),
		[]
	)
	const handleBrokenLinksCheckToggle = useCallback(
		() =>
			setOpenBrokenLinksCheck(openBrokenLinksCheck => !openBrokenLinksCheck),
		[]
	)
	const handleSubjectLineCheckToggle = useCallback(
		() =>
			setOpenSubjectLineCheck(openSubjectLineCheck => !openSubjectLineCheck),
		[]
	)
	const handleReverseDNSCheckToggle = useCallback(
		() => setOpenReverseDNSCheck(openReverseDNSCheck => !openReverseDNSCheck),
		[]
	)
	const handleListUnsubHeaderCheckToggle = useCallback(
		() =>
			setOpenListUnsubHeaderCheck(
				openListUnsubHeaderCheck => !openListUnsubHeaderCheck
			),
		[]
	)
	const handleHTMLBestPracticeCheckToggle = useCallback(
		() =>
			setOpenHTMLBestPracticeCheck(
				openHTMLBestPracticeCheck => !openHTMLBestPracticeCheck
			),
		[]
	)
	const handleBlacklistedURLCheckToggle = useCallback(
		() =>
			setOpenBlacklistedURLCheck(
				openBlacklistedURLCheck => !openBlacklistedURLCheck
			),
		[]
	)
	const handleSPFCheckToggle = useCallback(
		() => setOpenSPFCheck(openSPFCheck => !openSPFCheck),
		[]
	)
	const handleDKIMCheckToggle = useCallback(
		() => setOpenDKIMCheck(openDKIMCheck => !openDKIMCheck),
		[]
	)
	const handleDMARCCheckToggle = useCallback(
		() => setOpenDMARCCheck(openDMARCCheck => !openDMARCCheck),
		[]
	)

	const handleTabChange = useCallback(
		selectedTabIndex => setSelected(selectedTabIndex),
		[]
	)

	// let healthData = {
	// 	health_check: {
	// 		dkim: {
	// 			domain_signature_key: {
	// 				color: 'red',
	// 				dkim_signature_domain: false,
	// 				description:
	// 					"The DKIM signature is not from the author's or envelope-from domain.",
	// 				test_name: 'DKIM Signature Sender Domain',
	// 				dkim_sign_score: 0,
	// 				show_score: -2,
	// 			},
	// 			dkim_signature_key: {
	// 				color: 'green',
	// 				dkim_signature: true,
	// 				description:
	// 					'The email is signed with DKIM, whether or not it is a valid signature',
	// 				test_name: 'Existing DKIM Signature',
	// 				dkim_signed_score: 2,
	// 				show_score: 2,
	// 			},
	// 			dkim_validity_key: {
	// 				color: 'green',
	// 				dkim_validity: true,
	// 				description:
	// 					'The email is signed with a valid DKIM signature, whether or not it is from the correct sender domain.',
	// 				test_name: 'Verified DKIM Signature',
	// 				dkim_valid_score: 2,
	// 				show_score: 2,
	// 			},
	// 			message_key: {
	// 				message: 'Your DKIM record is not setup using best practices',
	// 			},
	// 			color: 'red',
	// 			dkim: false,
	// 		},
	// 		dmarc: {
	// 			domain_sign_key: {
	// 				color: 'red',
	// 				dkim_signature_domain: false,
	// 				description:
	// 					"Your 'from' domain does not match your DKIM 'from' domain or does not have DKIM signing..",
	// 				test_name: 'DKIM Signature and From Domain Alignment',
	// 				domain_sign_score: 0,
	// 				show_score: -2,
	// 			},
	// 			spf_align_key: {
	// 				color: 'green',
	// 				spf_align: true,
	// 				description:
	// 					"The email 'from' address matches the SPF 'from' address.",
	// 				test_name: 'SPF From Address and From Address Alignment',
	// 				spf_alignment_score: 2,
	// 				show_score: 2,
	// 			},
	// 			msg_key: {
	// 				message:
	// 					'Your DMARC authentication is not setup using best practices',
	// 			},
	// 			dmarc_record_key: {
	// 				test_name: 'Existing DMARC DNS Record',
	// 				color: 'red',
	// 				description: 'No DMARC DNS record for the appropriate domain.',
	// 				dmarc_record_score: 0,
	// 				show_score: -2,
	// 			},
	// 			dmarc_version_key: {
	// 				test_name: 'DMARC version tag',
	// 				color: 'red',
	// 				description:
	// 					'The DMARC DNS record does not start with a valid version tag.',
	// 				dmarc_version_score: 0,
	// 				show_score: -2,
	// 			},
	// 			dmarc_policy: {
	// 				test_name: 'DMARC policy tag',
	// 				color: 'red',
	// 				description: 'Your DMARC record policy is not good.',
	// 				dmarc_policy_score: 0,
	// 				show_score: -2,
	// 			},
	// 			duplicate_dmarc_key: {
	// 				test_name: 'Duplicate DMARC DNS Records',
	// 				color: 'green',
	// 				description:
	// 					'There are no duplicate DMARC DNS records for the specified domain.',
	// 				duplicate_dmarc_score: 2,
	// 				show_score: 2,
	// 			},
	// 			color: 'red',
	// 			dmarc: false,
	// 		},
	// 		spf: {
	// 			message: 'Your SPF record has errors',
	// 			spf_record_key: {
	// 				SPF: false,
	// 				color: 'red',
	// 				description:
	// 					'Publish a SPF record that includes all the tools you are currently using to send emails from your domain.',
	// 				test_name: 'Existing SPF DNS Record',
	// 				score: 0,
	// 				show_score: -4,
	// 			},
	// 			spf_mechanism_key: {
	// 				SPF_mechanism: false,
	// 				color: 'green',
	// 				description:
	// 					'The SPF DNS record does not include the ?all mechanism.',
	// 				test_name: 'SPF ?all Mechanism',
	// 				spf_all_score: 2,
	// 				show_score: 2,
	// 			},
	// 			color: 'red',
	// 			spf: false,
	// 			spf_ptr_mechanism_key: {
	// 				SPF_ptr_mechanism: false,
	// 				color: 'green',
	// 				description: 'The SPF DNS record does not include the ptr mechanism.',
	// 				test_name: 'SPF ptr Mechanism',
	// 				spf_ptr_score: 2,
	// 				show_score: 2,
	// 			},
	// 			duplicate_spf_record_key: {
	// 				duplicate_SPF_record: false,
	// 				color: 'green',
	// 				description:
	// 					'There are no duplicate SPF DNS records for the from domain.',
	// 				test_name: 'Duplicate SPF DNS record',
	// 				score: 2,
	// 				show_score: 2,
	// 			},
	// 			spf_auth_key: {
	// 				SPF_auth: false,
	// 				color: 'red',
	// 				description:
	// 					'The sender is not authorized to send emails from the domain.',
	// 				test_name: 'SPF Authorization',
	// 				spf_all_score: 0,
	// 				show_score: -2,
	// 			},
	// 		},
	// 		email_from: 'muhammadsajid@knowpakistan.net',
	// 		email_to: '7039ca5363dd8f6a24bd007ce6dd4a67@inboxbetter.com',
	// 		spam_assassin_score: {
	// 			spam_assassin_key: {
	// 				spam_assassin_score: '-0.0',
	// 				color: 'green',
	// 				message: 'Your Spam Assassin Score is safely below the threshold.',
	// 				description: 'Spam Assassin assigned the email a score of -0.0',
	// 				test_name: 'Spam Assassin',
	// 				spam_score: true,
	// 				score: 8,
	// 				show_score: 8,
	// 			},
	// 			color: 'green',
	// 			message: 'Your Spam Assassin Score is safely below the threshold.',
	// 		},
	// 		subject: {
	// 			email_subject: 'test',
	// 			to_address_in_subject: {
	// 				To_address: false,
	// 				color: 'green',
	// 				description:
	// 					'The subject line does not includes the sent to email address.',
	// 				test_name: 'To Address in Subject Line',
	// 				to_address_score: 2,
	// 				show_score: 2,
	// 			},
	// 			message: 'Your subject line is following anti-spam best practices!',
	// 			gappy_text: {
	// 				color: 'green',
	// 				gap_in_text: false,
	// 				description: 'Subject Line does not contain gappy text',
	// 				test_name: 'Subject Line Gappy Text',
	// 				gappy_text_score: 2,
	// 				show_score: 2,
	// 			},
	// 			color: 'green',
	// 			subject_line: true,
	// 			irregular_char_in_subject_key: {
	// 				irregular_char: false,
	// 				color: 'green',
	// 				description:
	// 					'The subject line is composed of legitimate and accepted characters.',
	// 				test_name: 'Subject Line Irregular Characters',
	// 				irregular_char_score: 3,
	// 				show_score: 3,
	// 			},
	// 			spam_phrase_key: {
	// 				spam_phrase: true,
	// 				color: 'green',
	// 				description:
	// 					'The subject line does not contain many of the common spam phrases.',
	// 				test_name: 'Subject Line Spam Language',
	// 				spam_phrase_score: 3,
	// 				show_score: 3,
	// 			},
	// 		},
	// 		short_urls: {
	// 			short_url_key: {
	// 				short_urls_in_body: 'body does not contain short urls',
	// 				color: 'green',
	// 				message: 'You are not using any dangerous short URLs!',
	// 				description:
	// 					'The HTML body does not include many of the common dangerous short URLs.',
	// 				test_name: 'Short URLs',
	// 				short_url_score: 4,
	// 				show_score: 4,
	// 			},
	// 			color: 'green',
	// 			message: 'You are not using any dangerous short URLs!',
	// 		},
	// 		broken_links: {
	// 			broken_link_key: {
	// 				broken_link_in_body: 'body does not contain broken links',
	// 				color: 'green',
	// 				message: 'Your email has no broken links',
	// 				description:
	// 					'Request for all links in the HTML body returns a successful HTTP response',
	// 				test_name: 'HTML Body Broken Links',
	// 				broken_link_score: 4,
	// 				show_score: 4,
	// 			},
	// 			color: 'green',
	// 			message: 'Your email has no broken links',
	// 		},
	// 		body: {
	// 			email_body: 'test',
	// 		},
	// 		mail_box: {
	// 			mail_box: 'Your email is landed in Inbox',
	// 		},
	// 		ip_blacklist: {
	// 			ip_detected_by: [
	// 				{
	// 					color: 'green',
	// 					provider: 'all.s5h.net',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'aspews.ext.sorbs.net',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'b.barracudacentral.org',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'bl.nordspam.com',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'bl.spamcop.net',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'blackholes.five-ten-sg.com',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'blacklist.woody.ch',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'bogons.cymru.com',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'cbl.abuseat.org',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'combined.abuse.ch',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'combined.rbl.msrbl.net',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'db.wpbl.info',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'dnsbl-2.uceprotect.net',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'dnsbl-3.uceprotect.net',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'dnsbl.cyberlogic.net',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'dnsbl.dronebl.org',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'red',
	// 					provider: 'dnsbl.sorbs.net',
	// 					blacklisted: true,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'drone.abuse.ch',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'dul.dnsbl.sorbs.net',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'dul.ru',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'dyna.spamrats.com',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'http.dnsbl.sorbs.netimages.rbl.msrbl.net',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'ips.backscatterer.org',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'ix.dnsbl.manitu.net',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'korea.services.net',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'matrix.spfbl.net',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'misc.dnsbl.sorbs.net',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'noptr.spamrats.com',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'phishing.rbl.msrbl.net',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'proxy.bl.gweep.ca',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'proxy.block.transip.nl',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'psbl.surriel.com',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'rbl.interserver.net',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'relays.bl.gweep.ca',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'relays.bl.kundenserver.de',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'relays.nether.net',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'residential.block.transip.nl',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'singular.ttk.pte.hu',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'smtp.dnsbl.sorbs.net',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'socks.dnsbl.sorbs.net',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'red',
	// 					provider: 'spam.dnsbl.sorbs.net',
	// 					blacklisted: true,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'spam.rbl.msrbl.net',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'spam.spamrats.com',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'spambot.bls.digibase.ca',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'spamlist.or.kr',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'spamrbl.imp.ch',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'spamsources.fabel.dk',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'ubl.lashback.com',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'virbl.bit.nl',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'virus.rbl.msrbl.net',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'virus.rbl.jp',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'web.dnsbl.sorbs.net',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'wormrbl.imp.ch',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'z.mailspike.net',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'zombie.dnsbl.sorbs.net',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'zen.spamhaus.org',
	// 					blacklisted: false,
	// 				},
	// 			],
	// 			is_ip_blacklisted: true,
	// 			message: 'Your Mail Server IP address is partially blacklisted.',
	// 			description:
	// 				'The Mail Server IP 209.85.215.174 that your email was sent from is listed on significant blacklist(s).This test does not necessarily take specific whitelists into consideration.',
	// 			test_name: "'From' IP Address Blacklists",
	// 			color: 'yellow',
	// 			ip_score: 4,
	// 			show_score: -4,
	// 		},
	// 		raw_email:
	// 			'Return-Path: <muhammadsajid@knowpakistan.net>\nX-Spam-Checker-Version: SpamAssassin 3.4.6 (2021-04-09) on s25.wpx.net\nX-Spam-Level: \nX-Spam-Status: No, score=-0.0 required=5.0 tests=DKIM_SIGNED,DKIM_VALID,\n\tHTML_MESSAGE,RCVD_IN_MSPIKE_H3,RCVD_IN_MSPIKE_WL,SPF_HELO_NONE,\n\tSPF_NONE,T_SCC_BODY_TEXT_LINE autolearn=ham autolearn_force=no\n\tversion=3.4.6\nX-Original-To: 7039ca5363dd8f6a24bd007ce6dd4a67@inboxbetter.com\nDelivered-To: catchall-inboxbetter.com@s25.wpx.net\nReceived: from mail-pg1-f174.google.com (mail-pg1-f174.google.com [209.85.215.174])\n\tby s25.wpx.net (Postfix) with ESMTPS id 3B66C52B8\n\tfor <7039ca5363dd8f6a24bd007ce6dd4a67@inboxbetter.com>; Wed, 29 Jun 2022 05:31:58 -0500 (CDT)\nReceived: by mail-pg1-f174.google.com with SMTP id q140so14909957pgq.6\n        for <7039ca5363dd8f6a24bd007ce6dd4a67@inboxbetter.com>; Wed, 29 Jun 2022 03:31:58 -0700 (PDT)\nDKIM-Signature: v=1; a=rsa-sha256; c=relaxed/relaxed;\n        d=knowpakistan-net.20210112.gappssmtp.com; s=20210112;\n        h=mime-version:from:date:message-id:subject:to;\n        bh=RN7KCe8eu9GH8zVhXs3IYoSfDR11TM0wdj3UguAJV0g=;\n        b=Szj5FNV6hnHlMqQVVq5MjPQn+DiLljjObEbbn9a3oS4iHBHNnr30kKEznmAFlKe6qo\n         Qf+EG5snHetzodtLjogsLcuOd0t7rimEHpfhIDVxaW9x4Et4BhkZnl1XJCyd/E+fqAuc\n         bMqrmgOcpII6xdfsAOkugb6vAjzo5Ayq7HHvmg0Xs7sGOUNQ2owcS2c/tA10ZKGe9CdT\n         1rka0rpuFEfe0NpeejUcFjfPNKuhjUYKcQCSQJ8nSqTCJKs09GVkJHKnil0tZnGXEsXa\n         bEhBUJSW3H8kjyUPoV7imfRMvmzds0nTC3u7v4Z8FPrlyBqeNyVWH4SOjmR4Q5jDbUhv\n         iAWg==\nX-Google-DKIM-Signature: v=1; a=rsa-sha256; c=relaxed/relaxed;\n        d=1e100.net; s=20210112;\n        h=x-gm-message-state:mime-version:from:date:message-id:subject:to;\n        bh=RN7KCe8eu9GH8zVhXs3IYoSfDR11TM0wdj3UguAJV0g=;\n        b=laHcK7y7QkfPqOFoOHmWw60jzqN2AyJ404QoSxLunnuvfYYFgWLPsJmNk0ysCJ3JsR\n         yqaDSaA3msQP3eBeYt17/RSkCj/4DkNzhpAWdGto1fhB/1h8jhQkXqJ0oCz1E1cm+jgU\n         R6Xx5sKsvWJ8/TYQ8r+gi5vRAqKWvNqq4xng8tgIBrTF5/GwVx5BjKNYlwVvxtaJvWAT\n         DRx4ZWJLmhL6NKAvXDOqICYohEMhltBi4+hRIof4eLJdOGfl2GQwE6I5gJkOshNwHLnv\n         IkVvNCma7+G2Cvr06UAq/rkOOWw0AvMC8cKKUG2XFN6ID1p0+fzCFTqqOLXOCm6Fzqg7\n         XcfA==\nX-Gm-Message-State: AJIora937H9EqdMfqbK4BGAvnfvmayDWoOBJPEMM/J1i214hL5h8SHEx\n\tEBow5q9Y9+ImQrGHWxYwd+hGYU4vMsUnkDH5mGnmGg8THk0ysQ==\nX-Google-Smtp-Source: AGRyM1twA7fiv21HaSLMcQMbEazMc1ylyQhJFHb8f3L1qw0ykYTPqUzp/h2aVGzq++djfX7xSKPFDZIgRdiBzy93Mmc=\nX-Received: by 2002:a05:6a00:278c:b0:525:65c0:6415 with SMTP id\n bd12-20020a056a00278c00b0052565c06415mr8391527pfb.33.1656498717244; Wed, 29\n Jun 2022 03:31:57 -0700 (PDT)\nMIME-Version: 1.0\nFrom: muhammad sajid <muhammadsajid@knowpakistan.net>\nDate: Wed, 29 Jun 2022 15:31:45 +0500\nMessage-ID: <CAKLsiWL=b=D5-jucEGexb7u_s=9F9NbPVr0UkYR+3m=hD+p=JA@mail.gmail.com>\nSubject: test\nTo: 7039ca5363dd8f6a24bd007ce6dd4a67@inboxbetter.com\nContent-Type: multipart/alternative; boundary="0000000000009cd33505e293a988"\nX-Greylist: Default is to whitelist mail, not delayed by milter-greylist-4.6.2 (s25.wpx.net [0.0.0.0]); Wed, 29 Jun 2022 05:31:58 -0500 (CDT)\n\n--0000000000009cd33505e293a988\nContent-Type: text/plain; charset="UTF-8"\n\ntest\n\n--0000000000009cd33505e293a988\nContent-Type: text/html; charset="UTF-8"\n\n<div dir="ltr">test</div>\n\n--0000000000009cd33505e293a988--',
	// 		domain_blacklist: {
	// 			domain_detected_by: [
	// 				{
	// 					color: 'green',
	// 					provider: 'all.s5h.net',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'aspews.ext.sorbs.net',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'b.barracudacentral.org',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'bl.nordspam.com',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'bl.spamcop.net',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'blackholes.five-ten-sg.com',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'blacklist.woody.ch',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'bogons.cymru.com',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'cbl.abuseat.org',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'combined.abuse.ch',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'combined.rbl.msrbl.net',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'db.wpbl.info',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'dnsbl-2.uceprotect.net',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'dnsbl-3.uceprotect.net',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'dnsbl.cyberlogic.net',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'dnsbl.dronebl.org',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'dnsbl.sorbs.net',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'drone.abuse.ch',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'dul.dnsbl.sorbs.net',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'dul.ru',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'dyna.spamrats.com',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'http.dnsbl.sorbs.netimages.rbl.msrbl.net',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'ips.backscatterer.org',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'ix.dnsbl.manitu.net',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'korea.services.net',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'matrix.spfbl.net',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'misc.dnsbl.sorbs.net',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'noptr.spamrats.com',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'phishing.rbl.msrbl.net',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'proxy.bl.gweep.ca',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'proxy.block.transip.nl',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'psbl.surriel.com',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'rbl.interserver.net',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'relays.bl.gweep.ca',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'relays.bl.kundenserver.de',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'relays.nether.net',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'residential.block.transip.nl',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'singular.ttk.pte.hu',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'smtp.dnsbl.sorbs.net',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'socks.dnsbl.sorbs.net',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'spam.dnsbl.sorbs.net',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'spam.rbl.msrbl.net',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'spam.spamrats.com',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'spambot.bls.digibase.ca',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'spamlist.or.kr',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'spamrbl.imp.ch',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'spamsources.fabel.dk',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'ubl.lashback.com',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'virbl.bit.nl',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'virus.rbl.msrbl.net',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'virus.rbl.jp',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'web.dnsbl.sorbs.net',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'wormrbl.imp.ch',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'z.mailspike.net',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'zombie.dnsbl.sorbs.net',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'zen.spamhaus.org',
	// 					blacklisted: false,
	// 				},
	// 				{
	// 					color: 'green',
	// 					provider: 'wl.mailspike.net',
	// 					blacklisted: false,
	// 				},
	// 			],
	// 			is_domain_blacklisted: false,
	// 			description:
	// 				"The 'from' domain is not listed on significant blacklist(s)",
	// 			message: 'Your domain is not listed on significant blacklists!',
	// 			test_name: 'Domain Blacklists',
	// 			color: 'green',
	// 			domain_blacklist_score: 8,
	// 			show_score: 8,
	// 		},
	// 		domain_suffix: {
	// 			domain_suffix_key: {
	// 				message: 'Your domain uses a trustworthy suffix!',
	// 				color: 'green',
	// 				suffix: true,
	// 				description: 'The from domain has a trustworthy suffix',
	// 				test_name: 'Domain Suffix',
	// 				suffix_score: 1,
	// 				show_score: 1,
	// 			},
	// 			color: 'green',
	// 			message: 'Your domain uses a trustworthy suffix!',
	// 		},
	// 		rDNS: {
	// 			rdns_key: {
	// 				color: 'green',
	// 				rdns: true,
	// 				description:
	// 					'The Mail Server IP that the email was received from has a rDNS PTR record that resolves to the received from Mail Server domain.',
	// 				test_name: 'Mail Server Reverse DNS',
	// 				rdns_score: 2,
	// 				show_score: 2,
	// 			},
	// 			rdns_helo_value: {
	// 				color: 'green',
	// 				rdns_helo: true,
	// 				description: 'The Mail Server IP rDNS matches the HELO client-ip..',
	// 				test_name: 'Mail Server and HELO Alignment',
	// 				rdns_score: 2,
	// 				show_score: 2,
	// 			},
	// 			color: 'green',
	// 			message: 'Your mail server Reverse DNS is properly configured.',
	// 		},
	// 		unsubscribe_header: {
	// 			unsubscribe_key: {
	// 				message: 'Your email is missing the List-Unsubscribe header.',
	// 				description: 'There is no List-Unsubscribe header.',
	// 				color: 'yellow',
	// 				test_name: 'List-Unsubscribe header',
	// 				list_unsubscribe_header: false,
	// 				list_unsubscribe_header_score: 0,
	// 				show_score: -1,
	// 			},
	// 			color: 'yellow',
	// 			message: 'Your email is missing the List-Unsubscribe header.',
	// 		},
	// 		blacklisted_url: {
	// 			blacklisted_url_key: {
	// 				blacklisted_urls_in_body: 'body does not contains blacklisted urls',
	// 				color: 'green',
	// 				message: 'Your Email body does not include any blacklisted URLs!',
	// 				description:
	// 					'No linked domains within the HTML body are listed on any impactful blacklists.',
	// 				test_name: 'Body blacklists',
	// 				blacklisted_score: 8,
	// 				show_score: 8,
	// 			},
	// 			color: 'green',
	// 			message: 'Your Email body does not include any blacklisted URLs!',
	// 		},
	// 		html_best_practise: {
	// 			to_many_url_key: {
	// 				too_many_urls: 'Your email body does not contain many urls',
	// 				color: 'green',
	// 				description:
	// 					'The HTML body has fewer links than commonly found in spam messages.',
	// 				test_name: 'HTML Body Link Count',
	// 				too_many_urls_score: 5,
	// 				show_score: 5,
	// 			},
	// 			long_urls_key: {
	// 				long_urls_key: 'Your email body does not contain too long urls',
	// 				color: 'green',
	// 				description:
	// 					'The HTML body includes links with URLs that are of normal length.',
	// 				test_name: 'Link URL sizes',
	// 				long_urls_score: 5,
	// 				show_score: 5,
	// 			},
	// 			color: 'green',
	// 			message: 'Your message body is using HTML best practices.',
	// 		},
	// 		encrypted_mail: {
	// 			encrypted_msg_key: {
	// 				encrypted_key: 'Your Email message is encrypted',
	// 				color: 'green',
	// 				description: 'Your email is using a standard encryption type',
	// 				test_name: 'Encrypted mail',
	// 				encrypted_score: 2,
	// 				show_score: 2,
	// 			},
	// 			color: 'green',
	// 			message: 'Your email is signed with a standard encryption',
	// 			encrypted: true,
	// 		},
	// 		things_to_fix: 5,
	// 		all_score: 79,
	// 	},
	// 	domain_age_: {
	// 		color: 'green',
	// 		domain_age_key: {
	// 			domain_name: 'knowpakistan.net',
	// 			domain_creation_date: '2020-10-09 09:56:05',
	// 			domain_age_in_years: 1,
	// 			domain_age_in_days: 628,
	// 			color: 'green',
	// 			message: 'your domain is mature.',
	// 			description: "The age of the 'from' domain is 628",
	// 			test_name: 'Domain Age',
	// 			domain_score: 2,
	// 			show_score: 2,
	// 		},
	// 		message: 'your domain is mature.',
	// 	},
	// }

	let tabs = [
		{
			id: 'things-to-fix',
			content: (
				<Heading>{`${
					healthData === undefined
						? ''
						: healthData.health_check !== undefined
						? healthData.health_check.things_to_fix
						: ''
				} Things To Fix`}</Heading>
			),
			accessibilityLabel: `${
				healthData === undefined
					? ''
					: healthData.health_check !== undefined
					? healthData.health_check.things_to_fix
					: ''
			} Things To Fix`,
			panelID: 'things-to-fix',
		},
		{
			id: 'raw-email',
			content: <Heading>{'Raw Email'}</Heading>,
			panelID: 'raw-email',
		},
	]

	const fetchData = async () => {
		axios
			.post(`https://inboxbetter.comocrm.com/api/domain-health/report`, {
				id: id,
			})
			.then(res => {
				setHealthData(JSON.parse(res.data))
			})
	}

	useEffect(() => {
		fetchData()
	}, [])

	return (
		<Page
			fullWidth
			subtitle={`${moment(new Date()).format('MMM D, YYYY')}`}
			title={`Email Blacklist & DNS Checker Results: ${'email here'}`}
		>
			<Stack>
				<Stack.Item fill>
					<Card sectioned>
						<Heading>{`50/100`}</Heading>
						<p>Emails Deliverability Score</p>
					</Card>
				</Stack.Item>
				<Stack.Item fill>
					<Card sectioned>
						<Heading>{`Want to Increase your Email Deliverability?`}</Heading>
						<p>
							<a>InboxBetter tips to fix your issues</a> (Coming Soon)
						</p>
					</Card>
				</Stack.Item>
			</Stack>
			<div style={{ marginTop: '10px' }}>
				<Stack>
					<Stack.Item fill>
						<Card>
							<Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
								{tabs[selected].id === 'things-to-fix' ? (
									<div style={{ padding: '10px ' }}>
										<Accordion
											open={openDomainBlacklistCheck}
											handleToggle={handleDomainBlackListCheckToggle}
											name='Domain Blacklist Check'
											status={
												healthData === 0
													? ''
													: healthData.health_check.domain_blacklist
															.is_domain_blacklisted === true
													? 'Bad'
													: 'Good'
											}
											color={
												healthData.length === 0
													? ''
													: healthData.health_check.domain_blacklist
															.is_domain_blacklisted === false
													? 'rgba(229,242,229)'
													: 'rgba(255, 242, 238)'
											}
											statusColor={
												healthData.length === 0
													? ''
													: healthData.health_check.domain_blacklist
															.is_domain_blacklisted === false
													? 'green'
													: 'red'
											}
											path='/assets/img/gg_screen.png'
											boldContent={
												healthData.health_check.domain_blacklist.message
											}
											simpleContent={
												healthData.health_check.domain_blacklist.description
											}
											detectedBy={
												healthData.health_check.domain_blacklist
													.domain_detected_by
											}
											explanation='Certain blacklists can have a severe affect on the ability to reach the inbox. We have aggregated a list of ones known to be meaningful.'
											test={[healthData.health_check.domain_blacklist]}
										/>
										<Accordion
											open={openSpamAssassinCheck}
											handleToggle={handleSpamAssassinCheckToggle}
											name='Spam Assassin Check'
											status={
												healthData.length === 0
													? ''
													: healthData.health_check.spam_assassin_score
															.color === 'green'
													? 'Good'
													: healthData.health_check.spam_assassin_score
															.color === 'yellow'
													? 'Warn'
													: 'Bad'
											}
											color={
												healthData.length === 0
													? ''
													: healthData.health_check.spam_assassin_score
															.color === 'green'
													? 'rgba(229,242,229)'
													: healthData.health_check.spam_assassin_score
															.color === 'yellow'
													? '#FFBB00'
													: 'rgba(255, 242, 238)'
											}
											statusColor={
												healthData.length === 0
													? ''
													: healthData.health_check.spam_assassin_score
															.color === 'green'
													? 'green'
													: healthData.health_check.spam_assassin_score
															.color === 'yellow'
													? '#FFBB00'
													: 'red'
											}
											score={
												healthData.length !== 0 &&
												healthData.health_check.spam_assassin_score
													.spam_assassin_key.spam_assassin_score
											}
											path='/assets/img/codicon-book.png'
											boldContent={
												healthData.health_check.spam_assassin_score.message
											}
											explanation='SpamAssassin is a widely used anti-spam platform and is a valuble proxy when gauging whether or not your email will be flagged as spam by major Email Service Providers.'
											test={[
												healthData.health_check.spam_assassin_score
													.spam_assassin_key,
											]}
										/>
										<Accordion
											open={openSPFCheck}
											handleToggle={handleSPFCheckToggle}
											name='SPF Check'
											status={
												healthData.length === 0
													? ''
													: healthData.health_check.spf.spf === true
													? 'Good'
													: 'Bad'
											}
											color={
												healthData.length === 0
													? ''
													: healthData.health_check.spf.color === 'green'
													? 'rgba(229,242,229)'
													: healthData.health_check.spf.color === 'yellow'
													? '#FFBB00'
													: 'rgba(255, 242, 238)'
											}
											statusColor={
												healthData.length === 0
													? ''
													: healthData.health_check.spf.color === 'yellow'
													? '#FFBB00'
													: healthData.health_check.spf.color
											}
											path='/assets/img/thunder.png'
											boldContent={healthData.health_check.spf.message}
											explanation='A valid SPF record will prevent spammers from sending spam from your domain.'
											test={[
												healthData.health_check.spf.spf_mechanism_key,
												healthData.health_check.spf.spf_record_key,
												healthData.health_check.spf.duplicate_spf_record_key,
												healthData.health_check.spf.spf_auth_key,
												healthData.health_check.spf.spf_ptr_mechanism_key,
											]}
										/>
										<Accordion
											open={openDKIMCheck}
											handleToggle={handleDKIMCheckToggle}
											name='DKIM Check'
											status={
												healthData.length === 0
													? ''
													: healthData.health_check.dkim.dkim === true
													? 'Good'
													: 'Bad'
											}
											color={
												healthData.length === 0
													? ''
													: healthData.health_check.dkim.color === 'green'
													? 'rgba(229,242,229)'
													: 'rgba(255, 242, 238)'
											}
											statusColor={
												healthData.length === 0
													? ''
													: healthData.health_check.dkim.color
											}
											score=''
											path='/assets/img/clipboard.png'
											boldContent={
												healthData.health_check.dkim.message_key.message
											}
											explanation='Publishing a DKIM key will will reduce the likelihood of your messages being blocked or ending up in the spam folder. It will also prevent spoofing by adding a digital signature to your email headers.'
											test={[
												healthData.health_check.dkim.dkim_signature_key,
												healthData.health_check.dkim.dkim_validity_key,
												healthData.health_check.dkim.domain_signature_key,
											]}
										/>
										<Accordion
											open={openDMARCCheck}
											handleToggle={handleDMARCCheckToggle}
											name='DMARC Check'
											status={
												healthData.length === 0
													? ''
													: healthData.health_check.dmarc.dmarc === 'block'
													? ['Good', 'Bad'][Math.floor(Math.random() * 2)]
													: healthData.health_check.dmarc.dmarc === true
													? 'Good'
													: 'Bad'
											}
											color={
												healthData.length === 0
													? ''
													: healthData.health_check.dmarc.color === 'block'
													? ['rgba(229,242,229)', 'rgba(255, 242, 238)'][
															Math.floor(Math.random() * 2)
													  ]
													: healthData.health_check.dmarc.color === 'green'
													? 'rgba(229,242,229)'
													: 'rgba(255, 242, 238)'
											}
											statusColor={
												healthData.length === 0
													? ''
													: healthData.health_check.dmarc.color === 'block'
													? ['green', 'red'][Math.floor(Math.random() * 2)]
													: healthData.health_check.dmarc.color
											}
											path='/assets/img/lock.png'
											boldContent={
												healthData.health_check.dmarc.msg_key.message ===
												'block'
													? 'Your DMARC Authentication Is Not Setup Using Best Practices'
													: healthData.health_check.dmarc.msg_key.message
											}
											explanation='Without having a Requested Mail Receiver DMARC policy published, emails from your domain can be spoofed and sent on your behalf.'
											test={[
												healthData.health_check.dmarc.dmarc_policy,
												healthData.health_check.dmarc.dmarc_record_key,
												healthData.health_check.dmarc.dmarc_version_key,
												healthData.health_check.dmarc.domain_sign_key,
												healthData.health_check.dmarc.spf_align_key,
												healthData.health_check.dmarc.duplicate_dmarc_key,
											]}
										/>
										<Accordion
											open={openDomainAgeCheck}
											handleToggle={handleDomainAgeCheckToggle}
											name='Domain age Check'
											status={
												healthData.length === 0
													? ''
													: healthData.domain_age_.color === 'block'
													? ['Good', 'Bad', 'Warn'][
															Math.floor(Math.random() * 3)
													  ]
													: healthData.domain_age_.color === 'green'
													? 'Good'
													: healthData.domain_age_.color === 'yellow'
													? 'Warn'
													: 'Bad'
											}
											color={
												healthData.length === 0
													? ''
													: healthData.domain_age_ !== undefined
													? healthData.domain_age_.color === 'block'
														? ['rgb(255,248,227)', 'rgba(255, 242, 238)'][
																Math.floor(Math.random() * 2)
														  ]
														: healthData.domain_age_.color === 'green'
														? 'rgba(229,242,229)'
														: healthData.domain_age_ !== undefined
														? healthData.domain_age_.color === 'yellow'
															? '#FFBB00'
															: 'rgba(255, 242, 238)'
														: ''
													: ''
											}
											statusColor={
												healthData.length === 0
													? ''
													: healthData.domain_age_ !== undefined
													? healthData.domain_age_.color === 'green'
														? 'green'
														: healthData.domain_age_ !== undefined
														? healthData.domain_age_.color === 'yellow'
															? '#FFBB00'
															: 'red'
														: ''
													: ''
											}
											path='/assets/img/domain_age.png'
											boldContent={
												healthData.domain_age_ !== undefined
													? healthData.domain_age_.message
													: ''
											}
											domain_age={
												healthData.domain_age_ !== undefined
													? healthData.domain_age_.domain_age_key
													: ''
											}
											explanation='The younger your domain is, the more difficult it is to attain a great domain reputation.'
											test={[
												healthData.domain_age_ !== undefined
													? healthData.domain_age_.domain_age_key
													: '',
											]}
										/>
										<Accordion
											open={openDomainSuffixCheck}
											handleToggle={handleDomainSuffixCheckToggle}
											name='Domain Suffix Check'
											status={
												healthData.length === 0
													? ''
													: healthData.health_check.domain_suffix.color ===
													  'block'
													? ['Good', 'Bad', 'Warn'][
															Math.floor(Math.random() * 3)
													  ]
													: healthData.health_check.domain_suffix.color ===
													  'green'
													? 'Good'
													: healthData.health_check.domain_suffix.color ===
													  'yellow'
													? 'Warn'
													: 'Bad'
											}
											color={
												healthData.length === 0
													? ''
													: healthData.health_check.domain_suffix.color ===
													  'block'
													? [
															'rgba(229,242,229)',
															'#FFBB00',
															'rgba(255, 242, 238)',
													  ][Math.floor(Math.random() * 3)]
													: healthData.health_check.domain_suffix.color ===
													  'green'
													? 'rgba(229,242,229)'
													: healthData.health_check.domain_suffix.color ===
													  'yellow'
													? '#FFBB00'
													: 'rgba(255, 242, 238)'
											}
											statusColor={
												healthData.length === 0
													? ''
													: healthData.health_check.domain_suffix.color ===
													  'block'
													? ['green', '#FFBB00', 'red'][
															Math.floor(Math.random() * 3)
													  ]
													: healthData.health_check.domain_suffix.color ===
													  'green'
													? 'green'
													: healthData.health_check.domain_suffix.color ===
													  'yellow'
													? '#FFBB00'
													: 'red'
											}
											path='/assets/img/domain_suffix.png'
											boldContent={
												healthData.health_check.domain_suffix.message ===
												'block'
													? 'Your Domain Uses A Trustworthy Suffix!'
													: healthData.health_check.domain_suffix.message
											}
											explanation='Certain domain suffixes are less likely to reach the inbox.'
											test={[
												healthData.health_check.domain_suffix.domain_suffix_key,
											]}
										/>
										<Accordion
											open={openIPBlacklistCheck}
											handleToggle={handleIPBlacklistCheckToggle}
											name='IP Blacklist Check'
											status={
												healthData === 0
													? ''
													: healthData.health_check.ip_blacklist.color ===
													  'block'
													? ['Good', 'Warn', 'Bad'][
															Math.floor(Math.random() * 3)
													  ]
													: healthData.health_check.ip_blacklist.color ===
													  'green'
													? 'Good'
													: healthData.health_check.ip_blacklist.color ===
													  'yellow'
													? 'Warn'
													: 'Bad'
											}
											color={
												healthData.length === 0
													? ''
													: healthData.health_check.ip_blacklist.color ===
													  'block'
													? [
															'rgba(229,242,229)',
															'#FFBB00',
															'rgba(255, 242, 238)',
													  ][Math.floor(Math.random() * 3)]
													: healthData.health_check.ip_blacklist.color ===
													  'green'
													? 'rgba(229,242,229)'
													: healthData.health_check.ip_blacklist.color ===
													  'yellow'
													? '#FFBB00'
													: 'rgba(255, 242, 238)'
											}
											statusColor={
												healthData.length === 0
													? ''
													: healthData.health_check.ip_blacklist.color ===
													  'block'
													? ['green', '#FFBB00', 'red'][
															Math.floor(Math.random() * 3)
													  ]
													: healthData.health_check.ip_blacklist.color ===
													  'green'
													? 'green'
													: healthData.health_check.ip_blacklist.color ===
													  'yellow'
													? '#FFBB00'
													: 'red'
											}
											path='/assets/img/ip_blacklist.png'
											boldContent={
												healthData.health_check.ip_blacklist.message === 'block'
													? 'Your Mail Server IP Address Is Partially Blacklisted'
													: healthData.health_check.ip_blacklist.message
											}
											detected_by={
												healthData.health_check.ip_blacklist.ip_detected_by
											}
											explanation='Not only can your domain be blacklisted, but the IP address from which you send your emails can as well. If this "Mail Server IP" is blacklisted it can cause your messages to be rejected or flagged as spam. It is important to get delisted and identify the root cause of why you were listed.If you use any tools/softwares to send out emails, it is possible that the shared or dedicated IP address being used by these is on a blacklist. Certain blacklists can have a severe affect on the ability to reach the inbox. We have aggregated a list of ones known to be meaningful.'
											test={[healthData.health_check.ip_blacklist]}
										/>
										<Accordion
											open={openShortURLsCheck}
											handleToggle={handleShortURLsCheckToggle}
											name='Short URLs Check'
											status={
												healthData === 0
													? ''
													: healthData.health_check.short_urls.color === 'green'
													? 'Good'
													: 'Bad'
											}
											color={
												healthData.length === 0
													? ''
													: healthData.health_check.short_urls.color === 'green'
													? 'rgba(229,242,229)'
													: 'rgba(255, 242, 238)'
											}
											statusColor={
												healthData.length === 0
													? ''
													: healthData.health_check.short_urls.color === 'green'
													? 'green'
													: 'red'
											}
											path='/assets/img/short_url.png'
											boldContent={healthData.health_check.short_urls.message}
											explanation='Using shortened URLs to track receiver behavior can cause spam filters to flag your email.'
											test={[healthData.health_check.short_urls.short_url_key]}
										/>
										<Accordion
											open={openBrokenLinksCheck}
											handleToggle={handleBrokenLinksCheckToggle}
											name='Broken Links Check'
											status={
												healthData === 0
													? ''
													: healthData.health_check.broken_links.color ===
													  'green'
													? 'Good'
													: 'Bad'
											}
											color={
												healthData.length === 0
													? ''
													: healthData.health_check.broken_links.color ===
													  'green'
													? 'rgba(229,242,229)'
													: 'rgba(255, 242, 238)'
											}
											statusColor={
												healthData.length === 0
													? ''
													: healthData.health_check.broken_links.color ===
													  'green'
													? 'green'
													: 'red'
											}
											path='/assets/img/broken_links.png'
											boldContent={healthData.health_check.broken_links.message}
											explanation='Having broken links in your email body can cause Email Service Providers to mark your message as spam.'
											test={[
												healthData.health_check.broken_links.broken_link_key,
											]}
										/>
										<Accordion
											open={openSubjectLineCheck}
											handleToggle={handleSubjectLineCheckToggle}
											name='Subject Line Check'
											status={
												healthData === 0
													? ''
													: healthData.health_check.subject.color === 'green'
													? 'Good'
													: 'Bad'
											}
											color={
												healthData.length === 0
													? ''
													: healthData.health_check.subject.color === 'green'
													? 'rgba(229,242,229)'
													: 'rgba(255, 242, 238)'
											}
											statusColor={
												healthData.length === 0
													? ''
													: healthData.health_check.subject.color
											}
											path='/assets/img/subject_line.png'
											boldContent={healthData.health_check.subject.message}
											explanation='The subject line is parsed and analyzed by spam filters and can cause your email to miss the inbox.'
											test={[
												healthData.health_check.subject.gappy_text,
												healthData.health_check.subject.to_address_in_subject,
												healthData.health_check.subject
													.irregular_char_in_subject_key,
												healthData.health_check.subject.spam_phrase_key,
											]}
										/>
										<Accordion
											open={openReverseDNSCheck}
											handleToggle={handleReverseDNSCheckToggle}
											name='Reverse DNS Check'
											status={
												healthData === 0
													? ''
													: healthData.health_check.rDNS.color === 'block'
													? ['Good', 'Bad'][Math.floor(Math.random() * 2)]
													: healthData.health_check.rDNS.color === 'green'
													? 'Good'
													: 'Bad'
											}
											color={
												healthData.length === 0
													? ''
													: healthData.health_check.rDNS.color === 'block'
													? ['rgba(229,242,229)', 'rgba(255, 242, 238)'][
															Math.floor(Math.random() * 2)
													  ]
													: healthData.health_check.rDNS.color === 'green'
													? 'rgba(229,242,229)'
													: 'rgba(255, 242, 238)'
											}
											statusColor={
												healthData.length === 0
													? ''
													: healthData.health_check.rDNS.color === 'block'
													? ['green', 'red'][Math.floor(Math.random() * 2)]
													: healthData.health_check.rDNS.color
											}
											path='/assets/img/reverse_dns.png'
											boldContent={
												healthData.health_check.rDNS.message === 'block'
													? 'Your Mail Server Reverse DNS Is Properly Configured.'
													: healthData.health_check.rDNS.message
											}
											explanation='Email Service Providers like Gmail, Yahoo, etc. may block emails coming from a mail server that does not have Reverse DNS in place.'
											test={[
												healthData.health_check.rDNS.rdns_key,
												healthData.health_check.rDNS.rdns_helo_value,
											]}
										/>
										<Accordion
											open={openListUnsubHeaderCheck}
											handleToggle={handleListUnsubHeaderCheckToggle}
											name='List-Unsubscribe Header Check'
											status={
												healthData === 0
													? ''
													: healthData.health_check.unsubscribe_header.color ===
													  'block'
													? ['Good', 'Bad', 'Warn'][
															Math.floor(Math.random() * 3)
													  ]
													: healthData.health_check.unsubscribe_header.color ===
													  'green'
													? 'Good'
													: healthData.health_check.unsubscribe_header.color ===
													  'yellow'
													? 'Warn'
													: 'Bad'
											}
											color={
												healthData.length === 0
													? ''
													: healthData.health_check.unsubscribe_header.color ===
													  'block'
													? [
															'rgba(229,242,229)',
															'#FFBB00',
															'rgba(255, 242, 238)',
													  ][Math.floor(Math.random() * 3)]
													: healthData.health_check.unsubscribe_header.color ===
													  'green'
													? 'rgba(229,242,229)'
													: healthData.health_check.unsubscribe_header.color ===
													  'yellow'
													? '#FFBB00'
													: 'rgba(255, 242, 238)'
											}
											statusColor={
												healthData.length === 0
													? ''
													: healthData.health_check.unsubscribe_header.color ===
													  'block'
													? ['green', '#FFBB00', 'red'][
															Math.floor(Math.random() * 3)
													  ]
													: healthData.health_check.unsubscribe_header.color ===
													  'green'
													? 'green'
													: healthData.health_check.unsubscribe_header.color ===
													  'yellow'
													? '#FFBB00'
													: 'red'
											}
											path='/assets/img/list_unsubscribe.png'
											boldContent={
												healthData.health_check.unsubscribe_header.message ===
												'block'
													? 'Your Email Is Missing The List-Unsubscribe Header'
													: healthData.health_check.unsubscribe_header.message
											}
											explanation='Email Service Providers like Gmail, Yahoo, etc. may block emails coming from a mail server that does not have Reverse DNS in place.'
											test={[
												healthData.health_check.unsubscribe_header
													.unsubscribe_key,
											]}
										/>
										<Accordion
											open={openHTMLBestPracticeCheck}
											handleToggle={handleHTMLBestPracticeCheckToggle}
											name='HTML Best Practice Check'
											status={
												healthData === 0
													? ''
													: healthData.health_check.html_best_practise.color ===
													  'block'
													? ['Good', 'Bad'][Math.floor(Math.random() * 2)]
													: healthData.health_check.html_best_practise.color ===
													  'green'
													? 'Good'
													: healthData.health_check.html_best_practise.color ===
													  'yellow'
													? 'Good'
													: 'Bad'
											}
											color={
												healthData.length === 0
													? ''
													: healthData.health_check.html_best_practise.color ===
													  'block'
													? [
															'rgba(229,242,229)',
															'#FFBB00',
															'rgba(255, 242, 238)',
													  ][Math.floor(Math.random() * 3)]
													: healthData.health_check.html_best_practise.color ===
													  'green'
													? 'rgba(229,242,229)'
													: healthData.health_check.html_best_practise.color ===
													  'yellow'
													? '#FFBB00'
													: 'rgba(255, 242, 238)'
											}
											statusColor={
												healthData.length === 0
													? ''
													: healthData.health_check.html_best_practise.color ===
													  'block'
													? ['green', '#FFBB00', 'red'][
															Math.floor(Math.random() * 3)
													  ]
													: healthData.health_check.html_best_practise.color ===
													  'green'
													? 'green'
													: healthData.health_check.html_best_practise.color ===
													  'yellow'
													? '#FFBB00'
													: 'red'
											}
											path='/assets/img/html-best-practice.png'
											boldContent={
												healthData.health_check.html_best_practise.message ===
												'block'
													? 'Your Message Body Is Using HTML Best Practices.'
													: healthData.health_check.html_best_practise.message
											}
											explanation='Email Service Providers like Gmail, Yahoo, etc. may block emails coming from a mail server that does not have Reverse DNS in place.'
											test={[
												healthData.health_check.html_best_practise
													.long_urls_key,
												healthData.health_check.html_best_practise
													.to_many_url_key,
											]}
										/>
										<Accordion
											open={openBlacklistedURLCheck}
											handleToggle={handleBlacklistedURLCheckToggle}
											name='Blacklisted Url Check'
											status={
												healthData === 0
													? ''
													: healthData.health_check.blacklisted_url.color ===
													  'block'
													? ['Good', 'Bad'][Math.floor(Math.random() * 2)]
													: healthData.health_check.blacklisted_url.color ===
													  'green'
													? 'Good'
													: healthData.health_check.blacklisted_url.color ===
													  'yellow'
													? 'Good'
													: 'Bad'
											}
											color={
												healthData.length === 0
													? ''
													: healthData.health_check.blacklisted_url.color ===
													  'block'
													? [
															'rgba(229,242,229)',
															'#FFBB00',
															'rgba(255, 242, 238)',
													  ][Math.floor(Math.random() * 3)]
													: 'green'
													? 'rgba(229,242,229)'
													: healthData.health_check.blacklisted_url.color ===
													  'yellow'
													? '#FFBB00'
													: 'rgba(255, 242, 238)'
											}
											statusColor={
												healthData.length === 0
													? ''
													: healthData.health_check.blacklisted_url.color ===
													  'block'
													? ['green', '#FFBB00', 'red'][
															Math.floor(Math.random() * 3)
													  ]
													: healthData.health_check.blacklisted_url.color ===
													  'green'
													? 'green'
													: healthData.health_check.blacklisted_url.color ===
													  'yellow'
													? '#FFBB00'
													: 'red'
											}
											path='/assets/img/blacklisted-url.png'
											boldContent={
												healthData.health_check.blacklisted_url.message ===
												'block'
													? 'Your Email Body Does Not Include Any Blacklisted URLs!'
													: healthData.health_check.blacklisted_url.message
											}
											explanation='Email Service Providers like Gmail, Yahoo, etc. may block emails coming from a mail server that does not have Reverse DNS in place.'
											test={[
												healthData.health_check.blacklisted_url
													.blacklisted_url_key,
											]}
										/>
									</div>
								) : (
									<div style={{ padding: '10px' }}>
										<pre>
											{healthData !== undefined
												? healthData.health_check !== undefined
													? healthData.health_check.raw_email
													: ''
												: ''}
										</pre>
									</div>
								)}
							</Tabs>
						</Card>
					</Stack.Item>
				</Stack>
			</div>
		</Page>
	)
}

export default dnsReport
