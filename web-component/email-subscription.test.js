/**
 * @jest-environment jsdom
 */

require('./email-subscription')

test('Should have class initializer', () => {
    expect(typeof EmailSubscription === 'function').toBeTruthy()
})

test('Should add component to the dom', () => {
    new EmailSubscription()
    let el = document.querySelector('email-subscription')

    expect(el).not.toBeNull
})

test('Should popup body shown on btn click', () => {
    if (!document.querySelector('email-subscription'))
        new EmailSubscription()

    document.querySelector('email-subscription').shadowRoot.querySelector('.popup-btn').click()

    setTimeout(() => {
        let opacity = window.getComputedStyle(document.querySelector('email-subscription').shadowRoot.querySelector('.popup-body'))['opacity']
        expect(opacity).toEqual(1)
    }, 100)
})