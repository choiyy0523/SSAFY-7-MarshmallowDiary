import React from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import Footer from '../../components/component/Footer';
import { Icon } from '@rneui/themed';
import SwitchComponent from './Switch';
import { useTheme } from 'react-native-paper';
import ChangeDarkModeSwitch from './darkSwitch';

const Settings = ({ navigation, props }) => {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        {/* 비밀번호 설정 */}
        {/* 만약 on이라면 onPress시 pwcheck으로 이동
          만약 off라면 onPress disabled */}
        <TouchableOpacity style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
          <View style={styles.barStyle}>
            <View>
              <Icon name='lock-outline' type='materialcommunityicons' size={25} color={colors.iconColor} style={styles.iconStyle} />
            </View>
            <View style={styles.menuStyle}>
              <Text>
                비밀번호 설정
              </Text>

              {/* <Text >
                비밀번호 변경
              </Text> */}
              <Text >
                추후 지원 예정 :D
              </Text>
            </View>
            <View style={styles.switchStyle}>
              <SwitchComponent />
            </View>

          </View>
        </TouchableOpacity>

        {/* 다크모드 설정 */}
        {/* toggle on일 때 asyncstorage 변경 */}
        <TouchableOpacity style={{ paddingHorizontal: 20, paddingVertical: 15 }}>

          <View style={styles.barStyle}>

            <View>
              <Icon
                name="moon"
                type="feather"
                size={25}
                color={colors.iconColor}
                style={styles.iconStyle}
              />
            </View>

            <View style={styles.menuStyle}>
              <Text>
                다크모드 설정
              </Text>
              <Text >
                추후 지원 예정 :D
              </Text>
            </View>


            <View style={styles.switchStyle}>
              <ChangeDarkModeSwitch />
            </View>

          </View>
        </TouchableOpacity>

        {/* 폰트 설정 */}
        {/* onPress시 모달로 폰트 선택 옵션 띄우기
        선택한 폰트 옵션으로 asyncstorage 변경 */}
        <TouchableOpacity style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
          <View style={styles.barStyle}>

            <View>
              <Icon name='font' type='fontisto' size={20} color={colors.iconColor} style={styles.iconStyle2} />
            </View>
            <View style={styles.menuStyle}>
              <Text >
                폰트 설정
              </Text>

              <Text>
                추후 지원 예정 :D
              </Text>
            </View>
            <View style={styles.switchStyle}>
              {/* <SwitchComponent /> */}
            </View>

          </View>
        </TouchableOpacity>

        {/* 푸쉬 알림 설정 */}
        {/* toggle on일 때 asyncstorage 변경 */}
        <TouchableOpacity style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
          <View style={styles.barStyle}>

            <View>
              <Icon
                name="bell"
                type="feather"
                size={25}
                color={colors.iconColor}
                style={styles.iconStyle}
              />
            </View>

            <View style={styles.menuStyle}>
              <Text>
                푸시알림 설정
              </Text>
              <Text >
                추후 지원 예정 :D
              </Text>
            </View>


            <View style={styles.switchStyle}>
              <SwitchComponent />
            </View>

          </View>
        </TouchableOpacity>

        {/* 이용 약관 */}
        {/* onPress시 terms.js로 이동 */}
        <TouchableOpacity onPress={() => navigation.navigate('Terms')} style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
          <View style={styles.barStyle}>

            <View>
              <Icon
                name="file-text"
                type="feather"
                size={25}
                color={colors.iconColor}
                style={styles.iconStyle}
              />
            </View>

            <View style={styles.menuStyle}>
              <Text >
                개인정보처리방침
              </Text>
            </View>


            <View style={styles.switchStyle}>
              {/* <SwitchComponent /> */}
            </View>

          </View>
        </TouchableOpacity>

        {/* 오픈소스 라이선스 */}
        {/* onPress시 opensource.js로 이동 */}
        <TouchableOpacity onPress={() => navigation.navigate('OpenSource')} style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
          <View style={styles.barStyle}>

            <View>
              <Icon
                name="book-open"
                type="feather"
                size={25}
                color={colors.iconColor}
                style={styles.iconStyle}
              />
            </View>

            <View style={styles.menuStyle}>
              <Text>
                오픈소스 라이선스
              </Text>
            </View>


            <View style={styles.switchStyle}>
              {/* <SwitchComponent /> */}
            </View>

          </View>
        </TouchableOpacity>

        {/* 이메일 문의 */}
        {/* onPress시 faq.js로 이동 */}
        <TouchableOpacity onPress={() => navigation.navigate('FAQ')} style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
          <View style={styles.barStyle}>

            <View>
              <Icon
                name="alternate-email"
                type="materialicons"
                size={25}
                color={colors.iconColor}
                style={styles.iconStyle}
              />
            </View>

            <View style={styles.menuStyle}>
              <Text>
                이메일 문의
              </Text>
            </View>


            <View style={styles.switchStyle}>
              {/* <SwitchComponent /> */}
            </View>

          </View>
        </TouchableOpacity>

        {/* 회원 탈퇴 */}
        {/* onPress시 탈퇴 여부 묻는 모달창 띄움 */}
        {/* 회원 탈퇴 선택시 카카오 링크 해제, db삭제 */}
        {/* <TouchableOpacity style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
          <View style={styles.barStyle}>

            <View>
              <Icon
                name="user-x"
                type="feather"
                size={25}
                color={colors.iconColor}
                style={styles.iconStyle}
              />
            </View>

            <View style={styles.menuStyle}>
              <Text s>
                회원 탈퇴
              </Text>
            </View>


            <View style={styles.switchStyle}> */}
        {/* <SwitchComponent /> */}
        {/* </View>

          </View>
        </TouchableOpacity> */}

      </ScrollView>
      <Footer />
    </View>

  )
};

export default Settings;


const styles = StyleSheet.create({
  barStyle: {
    flexDirection: 'row',
  },
  iconStyle: {
    justifyContent: 'center',
    marginHorizontal: 5,
    marginVertical: 10,
    flex: 0
  },
  iconStyle2: {
    justifyContent: 'center',
    marginHorizontal: 7,
    marginVertical: 10,
    flex: 0
  },
  menuStyle: {
    marginHorizontal: 20,
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 1
  },
  switchStyle: {
    justifyContent: 'flex-end',
    marginHorizontal: -15,
    flexDirection: 'row',
    alignItems: 'flex-end',
    flex: 0.3
  },
  textColor: {
    color: '#D9D9D9'
  }
})
