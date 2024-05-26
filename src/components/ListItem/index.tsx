import { Text, View } from 'react-native';

import styles from './styles';

type Props = {
    title: string;
    subTitle?: string;
    onPress?: () => void;
};

export default function ListItem({ title, subTitle, onPress }: Props) {
    return (
        <View style={styles.container} onTouchEnd={onPress}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subTitle}>{subTitle}</Text>
        </View>
    );
}