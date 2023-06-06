import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';

import Close from '@mui/icons-material/Close';
import { Box, Card, Dialog, IconButton, Typography } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select/SelectInput';

import {
  ColorType,
  FontSizeType,
  IconItem,
} from '@core/IconViewer/IconItem/IconItem';
import components from '@core/IconViewer/components';

interface IconDialogProps {
  open: boolean;
  onClose: () => void;
  current: string;
  renderString: string;
  setSnackbarOpen: (open: boolean) => void;
}

darcula['pre[class*="language-"]'].borderRadius = '0px';
darcula['pre[class*="language-"]'].margin = '0px';
darcula['pre[class*="language-"]'].cursor = 'pointer';
export function IconDialog(props: IconDialogProps) {
  const { open, onClose, current, setSnackbarOpen } = props;
  const [currentFontSize, setCurrentFontSize] =
    useState<FontSizeType>('medium');
  const [currentColor, setCurrentColor] = useState<ColorType>('primary');
  const [htmlColor, setHtmlColor] = useState<string>('#000000');
  const [customFontSize, setCustomFontSize] = useState<string>('80px');

  const renderString = `<${current} ${
    currentFontSize !== 'custom' ? "fontSize={'" + currentFontSize + "'} " : ''
  }${
    currentFontSize === 'custom'
      ? "sx={{ fontSize: '" + customFontSize + "' }} "
      : ''
  }${currentColor !== 'custom' ? "color={'" + currentColor + "'} " : ''}${
    currentColor === 'custom' ? "htmlColor={'" + htmlColor + "'} " : ''
  }/>`;
  const onChangeFontSize = (
    event: SelectChangeEvent<
      'small' | 'inherit' | 'medium' | 'large' | 'custom'
    >,
  ) => {
    setCurrentFontSize(event.target.value as FontSizeType);
  };

  const onChangeCustomFontSize = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCustomFontSize(event.target.value);
  };

  const onChangeColor = (
    event: SelectChangeEvent<
      | 'primary'
      | 'secondary'
      | 'error'
      | 'info'
      | 'success'
      | 'warning'
      | 'custom'
    >,
  ) => {
    setCurrentColor(event.target.value as ColorType);
  };

  const onChangeHtmlColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHtmlColor(event.target.value);
  };

  const handleClose = () => {
    setCurrentFontSize('medium');
    setCurrentColor('primary');
    setCustomFontSize('');
    setHtmlColor('');
    onClose();
  };
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setSnackbarOpen(true);
    } catch (err) {
      console.error('Error copying text: ', err);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <Card sx={{ width: 568 }}>
        {current && (
          <Box>
            <Box
              p={2}
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}>
              <Typography
                variant={'h2'}
                sx={{
                  px: 1,
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: 'rgba(0, 0, 0, 0.04)',
                  },
                }}
                onClick={() => copyToClipboard(`${current}`)}>
                {current}
              </Typography>
              <IconButton size={'small'} onClick={handleClose}>
                <Close />
              </IconButton>
            </Box>
            <SyntaxHighlighter
              onClick={() =>
                copyToClipboard(
                  `import ${current} from '@components/icons/${current}';`,
                )
              }
              language="javascript"
              style={darcula}>
              {`import ${current} from '@components/icons/${current}';`}
            </SyntaxHighlighter>
            <IconItem
              component={components[current]}
              currentFontSize={currentFontSize}
              currentColor={currentColor}
              htmlColor={htmlColor}
              customFontSize={customFontSize}
              onChangeFontSize={onChangeFontSize}
              onChangeCustomFontSize={onChangeCustomFontSize}
              onChangeColor={onChangeColor}
              onChangeHtmlColor={onChangeHtmlColor}
            />
            <SyntaxHighlighter
              onClick={() => copyToClipboard(renderString)}
              language="jsx"
              style={darcula}>
              {renderString}
            </SyntaxHighlighter>
          </Box>
        )}
      </Card>
    </Dialog>
  );
}
