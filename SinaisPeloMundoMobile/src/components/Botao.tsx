import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';
import { useAppTheme } from '../theme/ThemeContext';

type Props = {
  titulo: string;
  onPress: () => void;
  variante?: 'azul' | 'contorno'; // .btn-azul e .botao-tipo1 do CSS
  style?: StyleProp<ViewStyle>;
};

export default function Botao({ titulo, onPress, variante = 'azul', style }: Props) {
  const { colors, fs } = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => {
        // "pressed" faz o papel do :hover do site
        if (variante === 'azul') {
          return [
            s.base,
            {
              backgroundColor: pressed ? colors.primary : colors.primaryAction,
              borderColor: pressed ? colors.primaryAccent : colors.primary,
            },
            style,
          ];
        }
        return [
          s.base,
          {
            backgroundColor: pressed ? colors.textDark : 'transparent',
            borderColor: colors.borderBlack,
          },
          style,
        ];
      }}
    >
      {({ pressed }) => (
        <Text
          style={{
            fontSize: fs(16),
            color:
              variante === 'azul' || pressed ? colors.textOnPrimary : colors.text,
          }}
        >
          {titulo}
        </Text>
      )}
    </Pressable>
  );
}

const s = StyleSheet.create({
  base: {
    borderWidth: 2,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginTop: 10,
    alignSelf: 'center',
    alignItems: 'center',
  },
});
