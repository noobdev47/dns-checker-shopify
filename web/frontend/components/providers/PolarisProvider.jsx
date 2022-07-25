import { useCallback } from 'react'
import { AppProvider } from '@shopify/polaris'
import '@shopify/polaris/build/esm/styles.css'
import { useNavigate } from '@shopify/app-bridge-react'
import { Link as ReactRouterLink } from 'react-router-dom'
import translations from '@shopify/polaris/locales/en.json'

function AppBridgeLink({ url, children, external, ...rest }) {
	const navigate = useNavigate()
	const handleClick = useCallback(() => {
		navigate(url)
	}, [url])

	const IS_EXTERNAL_LINK_REGEX = /^(?:[a-z][a-z\d+.-]*:|\/\/)/

	if (external || IS_EXTERNAL_LINK_REGEX.test(url)) {
		return (
			<a target='_blank' rel='noopener noreferrer' href={url} {...rest}>
				{children}
			</a>
		)
	}

	return (
		<ReactRouterLink to={url} {...rest}>
			{children}
		</ReactRouterLink>
	)
}

/**
 * Sets up the AppProvider from Polaris.
 * @desc PolarisProvider passes a custom link component to Polaris.
 * The Link component handles navigation within an embedded app.
 * Prefer using this vs any other method such as an anchor.
 * Use it by importing Link from Polaris, e.g:
 *
 * ```
 * import {Link} from '@shopify/polaris'
 *
 * function MyComponent() {
 *  return (
 *    <div><Link url="/tab2">Tab 2</Link></div>
 *  )
 * }
 * ```
 *
 * PolarisProvider also passes translations to Polaris.
 *
 */
export function PolarisProvider({ children }) {
	return (
		<AppProvider i18n={translations} linkComponent={AppBridgeLink}>
			{children}
		</AppProvider>
	)
}
