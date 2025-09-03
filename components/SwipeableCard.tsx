import { FC } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { City, Units } from '../types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../utils/constants';
import colors from '../utils/colors';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

interface Props {
  city: City;
  unit: Units;
  onSwipeLeft: (city: City) => void;
  onSwipeRight: (city: City) => void;
  index: number;
  totalCards: number;
}

const CARD_WIDTH = SCREEN_WIDTH - 64;
const CARD_HEIGHT = SCREEN_HEIGHT * 0.5;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;

const SwipeableCard: FC<Props> = ({
  city,
  unit,
  onSwipeLeft,
  onSwipeRight,
  index,
  totalCards,
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);

  const handlePress = () => {
    navigation.navigate('CityDetails', { city, unit });
  };

  const panGesture = Gesture.Pan()
    .onStart(() => {
      startX.value = translateX.value;
      startY.value = translateY.value;
    })
    .onUpdate(event => {
      translateX.value = startX.value + event.translationX;
      translateY.value = startY.value + event.translationY;
    })
    .onEnd(() => {
      const shouldSwipeLeft = translateX.value < -SWIPE_THRESHOLD;
      const shouldSwipeRight = translateX.value > SWIPE_THRESHOLD;

      if (shouldSwipeLeft) {
        translateX.value = withSpring(-SCREEN_WIDTH, {}, () => {
          runOnJS(onSwipeLeft)(city);
        });
        translateY.value = withSpring(translateY.value + 100);
        opacity.value = withSpring(0);
      } else if (shouldSwipeRight) {
        translateX.value = withSpring(SCREEN_WIDTH, {}, () => {
          runOnJS(onSwipeRight)(city);
        });
        translateY.value = withSpring(translateY.value + 100);
        opacity.value = withSpring(0);
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    const rotation = interpolate(
      translateX.value,
      [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
      [-30, 0, 30],
      Extrapolation.CLAMP
    );

    const cardScale = interpolate(
      Math.abs(translateX.value),
      [0, SWIPE_THRESHOLD],
      [1, 0.95],
      Extrapolation.CLAMP
    );

    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotation}deg` },
        { scale: cardScale * scale.value },
      ],
      opacity: opacity.value,
      zIndex: totalCards - index,
    };
  });

  const leftIndicatorStyle = useAnimatedStyle(() => {
    const indicatorOpacity = interpolate(
      translateX.value,
      [-SWIPE_THRESHOLD, -50, 0],
      [1, 0.5, 0],
      Extrapolation.CLAMP
    );

    return {
      opacity: indicatorOpacity,
    };
  });

  const rightIndicatorStyle = useAnimatedStyle(() => {
    const indicatorOpacity = interpolate(
      translateX.value,
      [0, 50, SWIPE_THRESHOLD],
      [0, 0.5, 1],
      Extrapolation.CLAMP
    );

    return {
      opacity: indicatorOpacity,
    };
  });

  return (
    <View style={styles.cardContainer}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.card, animatedStyle]}>
          <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.9}
            style={styles.touchableCard}
          >
            <Image source={{ uri: city.image }} style={styles.image} />
            <View style={styles.overlay}>
              <View style={styles.content}>
                <Text style={styles.cityName}>{city.name}</Text>
                <Text style={styles.countryName}>{city.country}</Text>
                <Text style={styles.description} numberOfLines={4}>
                  {city.description}
                </Text>
              </View>
              <Animated.View style={[styles.indicator, styles.leftIndicator, leftIndicatorStyle]}>
                <Text style={styles.indicatorText}>REMOVE</Text>
              </Animated.View>

              <Animated.View style={[styles.indicator, styles.rightIndicator, rightIndicatorStyle]}>
                <Text style={styles.indicatorText}>FAVORITE</Text>
              </Animated.View>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    position: 'absolute',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  touchableCard: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: colors.overlay,
  },
  content: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
  },
  cityName: {
    color: colors.white,
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  countryName: {
    color: colors.white,
    fontSize: 20,
    opacity: 0.9,
    marginBottom: 12,
  },
  description: {
    color: colors.white,
    fontSize: 16,
    lineHeight: 22,
    opacity: 0.8,
  },
  indicator: {
    position: 'absolute',
    top: '50%',
    padding: 12,
    borderRadius: 8,
    borderWidth: 3,
    marginTop: -25,
  },
  leftIndicator: {
    left: 20,
    borderColor: colors.red,
  },
  rightIndicator: {
    right: 20,
    borderColor: colors.green,
  },
  indicatorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
  },
});

export default SwipeableCard;