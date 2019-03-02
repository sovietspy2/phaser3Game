export default function(layerName, id, scene, fontSize=20)
    {
        const objects = scene.map.filterObjects(layerName, obj => obj.name === id);
        objects.forEach(item => {

            if (item.visible) {
                scene.add.text(item.x, item.y, item.text.text).setColor(item.text.color).setFontSize(fontSize);
            }
        
        });
}
