import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';
import { useAppTheme } from '../theme/ThemeContext';

type Props = {
  titulo: string;
  onPress: () => void;
  // azul = .btn-azul | contorno = .botao-tipo1 | largo = .botao-tipo4 (comprar, confirmar...)
  variante?: 'azul' | 'contorno' | 'largo';
  style?: StyleProp<ViewStyle>;
};

export default function Botao({ titulo, onPress, variante = 'azul', style }: Props) {
  const { colors, fs } = useAppTheme();
  const azul = variante !== 'contorno';
  const largo = variante === 'largo';

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        s.base,
        largo && s.largo,
        // "pressed" faz o papel do :hover do site
        azul
          ? {
              backgroundColor: pressed ? colors.primary : colors.primaryAction,
              borderColor: pressed ? colors.primaryAccent : colors.primary,
            }
          : {
              backgroundColor: pressed ? colors.textDark : 'transparent',
              borderColor: colors.borderBlack,
            },
        style,
      ]}
    >
      {({ pressed }) => (
        <Text
          style={{
            fontSize: fs(largo ? 14 : 16),
            fontWeight: largo ? 'bold' : 'normal',
            color: azul || pressed ? colors.textOnPrimary : colors.text,
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
  largo: {
    width: '100%',
    maxWidth: 400,
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
});
