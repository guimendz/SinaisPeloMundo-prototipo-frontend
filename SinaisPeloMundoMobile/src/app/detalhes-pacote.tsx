import { ComponentProps, ReactNode } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MenuLateral from '../components/MenuLateral';
import Botao from '../components/Botao';
import { useAppTheme } from '../theme/ThemeContext';
import { detalhesExemplo as pacote } from '../data/detalhes';

type Icone = ComponentProps<typeof MaterialIcons>['name'];

function Paragrafo({ children }: { children: ReactNode }) {
  const { colors, fs } = useAppTheme();
  return <Text style={{ color: colors.text, fontSize: fs(16), marginBottom: 25 }}>{children}</Text>;
}

function LinhaIcone({ icone, children, ultima }: { icone: Icone; children: ReactNode; ultima?: boolean }) {
  const { colors, fs } = useAppTheme();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 6, marginBottom: ultima ? 0 : 25 }}>
      <MaterialIcons name={icone} size={20} color={colors.text} />
      <Text
        style={{
          flex: 1,
          color: colors.text,
          fontSize: fs(16),
          fontStyle: ultima ? 'italic' : 'normal',
        }}
      >
        {children}
      </Text>
    </View>
  );
}

function ServicoItem({ icone, titulo, children }: { icone: Icone; titulo: string; children: ReactNode }) {
  const { colors, fs } = useAppTheme();
  return (
    <View style={[s.servicoItem, { borderBottomColor: colors.borderSoft }]}>
      <View style={[s.iconBox, { backgroundColor: colors.white }]}>
        <MaterialIcons name={icone} size={24} color={colors.black} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ color: colors.text, fontWeight: 'bold', fontSize: fs(18.72), marginTop: 5, marginBottom: 25 }}>
          {titulo}
        </Text>
        {children}
      </View>
    </View>
  );
}

export default function DetalhesPacote() {
  const { colors, fs } = useAppTheme();
  const router = useRouter();
  // TODO: com o backend, ler o "id" (useLocalSearchParams) e buscar o pacote correspondente

  const voltar = () => (router.canGoBack() ? router.back() : router.replace('/'));

  return (
    <View style={{ flex: 1, backgroundColor: colors.page }}>
      <Header />

      <ScrollView>
        <View style={{ padding: 15 }}>
          <MenuLateral
            links={[
              { titulo: '< Voltar', onPress: voltar },
              { titulo: 'Detalhes do pacote', onPress: () => {}, atual: true },
              { titulo: 'Sair', onPress: () => router.replace('/') },
            ]}
          />

          <Text style={{ color: colors.primary, fontWeight: 'bold', fontSize: fs(32), marginBottom: 15 }}>
            Detalhes do pacote
          </Text>
          <Text style={{ color: colors.primary, fontWeight: 'bold', fontSize: fs(16), marginTop: 20, marginBottom: 25 }}>
            Confira o que está incluído no seu pacote de viagem
          </Text>

          <View
            style={[
              s.checkout,
              { borderColor: colors.borderSoft, backgroundColor: colors.surfaceAlt },
            ]}
          >
            {/* Imagem */}
            <View style={[s.cardImagem, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
              <View style={{ height: 180, backgroundColor: colors.mutedSurface }}>
                {pacote.urlImagem ? (
                  <Image source={{ uri: pacote.urlImagem }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
                ) : null}
              </View>
            </View>

            {/* Serviços */}
            <View>
              <View style={{ padding: 10 }}>
                <Text style={{ color: colors.text, fontWeight: 'bold', fontSize: fs(24), marginTop: 10, marginBottom: 15 }}>
                  {pacote.titulo}
                </Text>
                <Paragrafo>{pacote.descricao}</Paragrafo>
              </View>

              <ServicoItem icone="hotel" titulo="Hotel">
                <Paragrafo>{pacote.hotel.nome}</Paragrafo>
                <LinhaIcone icone="location-on" ultima>{pacote.hotel.endereco}</LinhaIcone>
              </ServicoItem>

              <ServicoItem icone="flight" titulo="Passagem aérea">
                <Paragrafo>{pacote.passagem.rota}</Paragrafo>
                <LinhaIcone icone="date-range">
                  Ida: {pacote.passagem.ida} · Volta: {pacote.passagem.volta}
                </LinhaIcone>
                <Paragrafo>{pacote.passagem.classe}</Paragrafo>
              </ServicoItem>

              <ServicoItem icone="person" titulo="Intérprete">
                <Paragrafo>{pacote.interprete.nome}</Paragrafo>
                <LinhaIcone icone="call" ultima={false}>{pacote.interprete.telefone}</LinhaIcone>
              </ServicoItem>
            </View>

            {/* Resumo */}
            <View style={{ padding: 20 }}>
              <Text style={{ color: colors.text, fontWeight: 'bold', fontSize: fs(16), marginBottom: 25 }}>
                Preço por pessoa
              </Text>
              <Text
                style={{
                  color: colors.text,
                  fontWeight: 'bold',
                  fontSize: fs(24),
                  marginTop: 5,
                  paddingBottom: 25,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.borderSoft,
                  marginBottom: 25,
                }}
              >
                {pacote.preco}
              </Text>

              <Text style={{ color: colors.text, fontWeight: 'bold', fontSize: fs(16), marginBottom: 6 }}>
                O que está incluído
              </Text>
              {pacote.inclusos.map((item) => (
                <View key={item} style={s.incluso}>
                  <MaterialIcons name="check-circle-outline" size={fs(18)} color={colors.textMuted} />
                  <Text style={{ color: colors.text, fontSize: fs(14) }}>{item}</Text>
                </View>
              ))}

              <Botao
                titulo="COMPRAR PACOTE"
                variante="largo"
                onPress={() => router.push('/revisao-compra' as any)}
              />
            </View>
          </View>
        </View>

        <Footer />
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  checkout: { padding: 10, borderWidth: 1, borderRadius: 10, gap: 20 },
  cardImagem: { borderWidth: 1, borderRadius: 12, overflow: 'hidden' },
  servicoItem: { flexDirection: 'row', gap: 15, paddingVertical: 20, borderBottomWidth: 1 },
  iconBox: { padding: 10, borderRadius: 10, alignSelf: 'flex-start' },
  incluso: { flexDirection: 'row', alignItems: 'center', gap: 8, marginVertical: 10 },
});
