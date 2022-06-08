import React, { useCallback, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import PropTypes from 'prop-types';

import Button from '../Button';

import styles from './TextCopyField.module.css';

const TextCopyField = ({ value, placeholder, buttonWrapper }) => {
  const transitionDuration = 0.15; // second(s)
  const stateDuration = 1; // second(s)
  const stateTimeout = transitionDuration + stateDuration; // second(s)

  const [isCopied, setIsCopied] = useState(false);

  const onCopy = useCallback(() => {
    setIsCopied(true);

    const timeout = setTimeout(() => {
      setIsCopied(false);
      clearTimeout(timeout);
    }, stateTimeout * 1000);
  }, [isCopied, setIsCopied]);
  const isEmpty = !value || value.length === 0;
  const onChange = (event) => {
    // Swallow keyboard events on the Input control, but
    // still allow selecting the text. readOnly property of
    // Input is not adequate for this purpose because it
    // prevents text selection
    event.preventDefault();
  };

  const ButtonWrapper = buttonWrapper;
  const CopyButton = (
    <CopyToClipboard text={value}>
      <Button
        className={`${styles['copy-button']} ${
          isCopied ? styles['is-copied'] : ''
        }`}
        // RFE: Avoid manual JS ↔ CSS sync of transition duration by using:
        //      - `data-attribute` and `attr()` (pending browser support)
        //      - PostCSS and JSON variables (pending greater need for this)
        style={{ '--transition-duration': `${transitionDuration}s` }}
        onClick={onCopy}
        disabled={isEmpty}
        iconNameBefore={isCopied ? 'approved-reverse' : 'link'}
        type="button"
      >
        Copy
      </Button>
    </CopyToClipboard>
  );
  const CopyField = (
    <input
      type="text"
      onChange={onChange}
      value={value}
      className={`form-control ${styles.input}`}
      placeholder={placeholder}
      data-testid="input"
      readOnly
    />
  )

  return (
    <>
      {ButtonWrapper ? (
        <ButtonWrapper>
          <CopyButton />
        </ButtonWrapper>
      ) : (
        <CopyButton />
      )}
      <CopyField />
    </>
  );
};

TextCopyField.propTypes = {
  buttonWrapper: PropTypes.node,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

TextCopyField.defaultProps = {
  buttonWrapper: undefined,
  placeholder: '',
  value: '',
};

export default TextCopyField;
