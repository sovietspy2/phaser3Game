export default function(layerName, id, scene)
    {
        const objects = scene.map.filterObjects(layerName, obj => obj.name === id);
        objects.forEach(item => {
            console.log(item);
            if (item.visible) {
                scene.add.text(item.x, item.y, item.text.text).setColor(item.text.color).setFontSize(20);
            }
        
        });
}
