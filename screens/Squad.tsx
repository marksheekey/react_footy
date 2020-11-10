import * as React from 'react';
import SquadList from '../components/SquadList'

import {
    TouchableOpacity,
    StyleSheet,
    View,
    Text,
    SafeAreaView,
} from 'react-native';

const SquadScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <SquadList />
    </SafeAreaView>
);
};
export default SquadScreen;
