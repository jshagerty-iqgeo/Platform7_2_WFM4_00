import myw from 'myWorld-client';
import React, { useState, useEffect } from 'react';
import { DraggableModal, Button } from 'myWorld-client/react';

export const ApiIntroModal = ({ open, structurePlugin, equipmentPlugin }) => {
    const [appRef] = useState(myw.app);
    const [db] = useState(appRef.database);
    const [isOpen, setIsOpen] = useState(open);
    const [structures, setStructures] = useState([]);
    const [rack, setRack] = useState();
    const [fiberShelf, setFiberShelf] = useState();

    useEffect(() => {
        db.getFeatures('myworld/rack').then(result => {
            setRack(result);
        });
        db.getFeatures('myworld/fiber_shelf').then(result => {
            setFiberShelf(result);
        });

        let promises = [];
        for (const structure in myw.config['mywcom.structures']) {
            let query = 'myworld/' + structure;
            promises.push(db.getFeatures(query));
        }
        Promise.all(promises).then(result => {
            setStructures(result.flat());
        });
    }, []);

    const closeWindow = () => {
        setIsOpen(false);
    };

    const onStructContent = () => {
        const index = Math.floor(Math.random() * structures.length);
        structurePlugin.structContent(structures[index]).then(result => {
            console.log('Content of structure: ', structures[index]._myw.title);
            console.log(result);
            appRef.setCurrentFeature(structures[index], { zoomTo: true });
            appRef.map.zoomTo(result);
        });
    };

    const onCopyAssembly = () => {
        const fiberIndex = Math.floor(Math.random() * fiberShelf.length);
        const housingId = fiberShelf[fiberIndex].properties.housing.split('/')[1];
        const housingIdNum = parseInt(housingId, 10);
        const originalHousing = rack.find(obj => obj.id === housingIdNum);
        const rackIndex = Math.floor(Math.random() * rack.length);
        console.log(
            'Fiber shelf ' +
                fiberShelf[fiberIndex].properties.name +
                ' is on rack ' +
                originalHousing.properties.name +
                ' and a copy of it will be created at the rack ' +
                rack[rackIndex].properties.name
        );
        equipmentPlugin
            .copyAssembly(fiberShelf[fiberIndex], rack[rackIndex])
            .then(result => {
                console.log('The rack has been copied successfully!');
                appRef.map.zoomTo(rack[rackIndex]);
            })
            .catch(alert);
    };

    const onConnectionsIn = () => {
        const shelf = Math.floor(Math.random() * fiberShelf.length);
        console.log('Connections in ' + fiberShelf[shelf].properties.name);
        equipmentPlugin.connectionsIn(fiberShelf[shelf]).then(result => {
            console.log(result);
            appRef.map.zoomTo(fiberShelf[shelf]);
        });
    };

    const onGetStructuresAt = () => {
        const coords = [];
        const index = Math.floor(Math.random() * structures.length);
        coords.push(
            structures[index].getGeometry().coordinates[0],
            structures[index].getGeometry().coordinates[1]
        );
        structurePlugin.getStructuresAt(coords, null, 100).then(result => {
            console.log('Structures at coords: ' + coords[0] + ' - ' + coords[1]);
            console.log(result);
            appRef.setCurrentFeatureSet(result);
            appRef.map.zoomTo(result[0]);
        });
    };

    return (
        <DraggableModal
            wrapClassName="structure-api-modal"
            open={isOpen}
            title={'API Intro'}
            width={500}
            onCancel={closeWindow}
            footer={[
                <Button key="close" onClick={closeWindow} type="primary">
                    Close Window
                </Button>
            ]}
        >
            <Button key="structContent" onClick={onStructContent} type="primary">
                structContent
            </Button>
            <br />
            <Button key="getStructuresAt" onClick={onGetStructuresAt} type="primary">
                getStructuresAt
            </Button>
            <br />
            <Button key="copyAssembly" onClick={onCopyAssembly} type="primary">
                copyAssembly
            </Button>
            <br />

            <Button key="connectionsIn" onClick={onConnectionsIn} type="primary">
                connectionsIn
            </Button>
            <br />
        </DraggableModal>
    );
};
