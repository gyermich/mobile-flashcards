import { NavigationActions } from 'react-navigation'

export const tintColor = '#2f95dc'
export const white = '#fff'

export const toDeck = (deck) => {
    return NavigationActions.navigate({
        routeName: 'DeckNavigator',
        action: NavigationActions.navigate({
            routeName: 'DeckDetail',
            params: { deck: deck },
        }),
    })
}

export const goBack = () => NavigationActions.back({ key: null })

export const toAddCard = (deck) => NavigationActions.navigate({
    routeName: 'NewQuestion',
    params: { deck },
})
