export const filter= (item)=> {
    const filterItems = ['stocks','importRecord']
    const filterArray = ['properties','productProperties','images','analogs','importProperties','ingredients','modifiers','tags','uploadedImages']

    item.map(i=> {
        i.properties.forEach(property=>i[property.name]=property.value)
        i.productProperties.forEach(property=>i[property.name]=property.value)

        i.images.length !==0 ? i.images.forEach(item=> i['imageUrl']=item.urls.original) : i['imageUrl']=''
        filterArray.forEach(f=>delete i[f])

        Object.keys(i).forEach(key=> (i[key] === null || filterItems.includes(key)) && delete i[key])
        return i
    })
    return item
}

