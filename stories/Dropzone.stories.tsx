import React from 'react';
import { docs } from '../.storybook/docs';
import { DropZone } from '../src/dropzone';
import { FileTrigger, isFileDropItem } from 'react-aria-components';
import { Button } from '../src/button';
import { Text } from '../src/text';
import { ImageIcon } from '../src/icons/outline/image';

const meta = {
  parameters: {
    layout: 'centered',
    docs,
  },
};

export default meta;

export const BasicExample = () => {
  const [droppedImage, setDroppedImage] = React.useState<string | undefined>(
    undefined,
  );

  return (
    <DropZone
      getDropOperation={(types) =>
        types.has('image/jpeg') || types.has('image/png') ? 'copy' : 'cancel'
      }
      onDrop={async (e) => {
        const item = e.items
          .filter(isFileDropItem)
          .find(
            (item) => item.type === 'image/jpeg' || item.type === 'image/png',
          );
        if (item) {
          setDroppedImage(URL.createObjectURL(await item.getFile()));
        }
      }}
    >
      {droppedImage ? (
        <img
          alt=""
          src={droppedImage}
          className="aspect-square h-full w-full object-contain"
        />
      ) : (
        <div className="flex flex-1 flex-col py-6">
          <div className="flex flex-1 justify-center">
            <ImageIcon className="text-muted size-10 stroke-1" />
          </div>
          <div className="flex flex-1 pt-2">
            <Text>Drag and drop to upload</Text>
          </div>
          <div className="flex flex-1 justify-center">
            <Text>PNG, JPG, GIF up to 10MB</Text>
          </div>
          <div className='flex justify-center pt-4'>
            <FileTrigger
              acceptedFileTypes={['image/png', 'image/jpeg']}
              allowsMultiple={false}
              onSelect={async (e) => {
                if (e) {
                  const files = Array.from([...e]);
                  const item = files[0];

                  if (item) {
                    setDroppedImage(URL.createObjectURL(item));
                  }
                }
              }}
            >
              <Button variant="outline" size="sm">
                Browse files
              </Button>
            </FileTrigger>
          </div>
          &nbsp;
        </div>
      )}

      <input type="hidden" name="image" value={droppedImage} />
    </DropZone>
  );
};
