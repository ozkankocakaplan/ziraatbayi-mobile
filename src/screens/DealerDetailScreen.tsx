import React from 'react';

import AdvertCard from '../components/Advert/AdvertCard';
import Container from '../components/Container/Container';
import {RootStackParamList} from '../types/navigator';
import Page from '../components/Page/Page';
import AdvertResponse from '../payload/response/AdvertResponse';
import CustomFlatList from '../components/Flatlist/CustomFlatList';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {DealerApi} from '../services/dealerService';

export default function DealerDetailScreen({
  route,
}: NativeStackScreenProps<RootStackParamList, 'DealerDetailScreen'>) {
  const {id} = route.params;
  const {data, error} = DealerApi.useGetDealerDetailQuery(1);

  return (
<<<<<<< HEAD
    <>
      <Page showGoBack header title="Bayi Adı">
        <Container>
          <HeaderRow>
            <SearchInput
              value={search}
              onChangeText={setSearch}
              returnKeyLabel="search"
              returnKeyType="search"
              placeholder="Ara..."
              onSubmitEditing={() => {
                navigation.navigate('SearchScreen', {query: search});
              }}
            />
            <FilterIconContainer
              onPress={() => {
                bottomSheetRef.current?.open();
              }}>
              <FontAwesomeIcon icon={faFilter} size={24} color="#333" />
            </FilterIconContainer>
          </HeaderRow>
          <CustomFlatList
            numColumns={3}
            data={data?.list || []}
            renderItem={(item: AdvertResponse) => {
              return <AdvertCard key={item.id} item={item} />;
            }}
          />
        </Container>
      </Page>
      <CustomBottomSheet ref={bottomSheetRef} snapPoints={['50%']}>
        <View style={{padding: 20}}>
          <Text style={{fontSize: 16}}>Alt bilgi içeriği buraya gelecek.</Text>
          <TouchableOpacity onPress={closeBottomSheet} style={{marginTop: 20}}>
            <Text style={{color: 'blue'}}>Kapat</Text>
          </TouchableOpacity>
        </View>
      </CustomBottomSheet>
    </>
=======
    <Page showGoBack header title={data?.entity.companyName + ' Bayisi'}>
      <Container>
        <CustomFlatList
          numColumns={3}
          data={data?.list || []}
          renderItem={(item: AdvertResponse) => {
            return <AdvertCard key={item.id} item={item} />;
          }}
        />
      </Container>
    </Page>
>>>>>>> e64c1d3 (ProductsByCategoryScreen was created and design deficiencies were corrected.)
  );
}
