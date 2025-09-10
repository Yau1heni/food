import Text from 'components/Text';

import styles from './Description.module.scss';

export const Description = () => {
  return (
    <div className={styles.description}>
      <Text view={'p-20'}>Find the perfect food and&nbsp;</Text>
      <Text className={styles.underlineText} view={'p-20'}>
        drink ideas
      </Text>
      <Text view={'p-20'}>&nbsp;for every occasion, from&nbsp;</Text>
      <Text className={styles.underlineText} view={'p-20'}>
        weeknight dinners
      </Text>
      <Text view={'p-20'}>&nbsp;to&nbsp;</Text>
      <Text className={styles.underlineText} view={'p-20'}>
        holiday feasts
      </Text>
      <Text view={'p-20'}>.</Text>
    </div>
  );
};
