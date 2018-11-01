import { NavigationActions } from 'react-navigation'

export const tintColor = '#2f95dc'
export const white = '#fff'

export const toDeck = (deckTitle) => {
    return NavigationActions.navigate({
        routeName: 'DeckNavigator',
        action: NavigationActions.navigate({
            routeName: 'DeckDetail',
            params: { deckTitle: deckTitle },
        }),
    })
}
