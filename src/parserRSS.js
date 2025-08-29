export default(xmlString) => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(xmlString, 'text/xml')

    const channel = doc.querySelector('channel')
    if (!channel) {
        throw new Error('Invalid RSS')
    }
    const items = doc.querySelectorAll('item')

    const feed = {
        title: channel.querySelector('title').textContent,
        description: channel.querySelector('description').textContent
    }

    const posts = Array.from(items).map(item => ({
        title: item.querySelector('title').textContent,
        link: item.querySelector('link').textContent,
        description: item.querySelector('description').textContent
    }))

    return { feed, posts }
}