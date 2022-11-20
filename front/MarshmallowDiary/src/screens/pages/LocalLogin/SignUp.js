import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity, Modal, Pressable } from 'react-native';
import logo from '../../../assets/logo.png'
import { http } from '../../../api/http';
import { Input } from '@rneui/themed';

const SignUp = ({ navigation }) => {

  const [id, setId] = useState()
  const [nick, setNick] = useState()
  const [pass, setPass] = useState()

  const idcheck = () => {
    if (id) {
      http.get(`/user/idcheck?id=${id}`, {
        id: id
      })
      .then(res => {
        if (res.data.message == "사용할 수 있는 ID 입니다.") {
          setOverlap(false)
          openModal()
        }
        else {
          setOverlap(true)
          openModal()
          setId(null)
        }
      })
      .catch(err => {
        console.log(err)  
      })
    }
  }

  // 중복 확인 모달
  const [visible, setVisible] = useState(false)
  const openModal = () => {
    setVisible(true)
  }
  const closeModal = () => {
    setVisible(false)
  }

  const [overlap, setOverlap] = useState()

   // 가입하기 모달
  const [visible2, setVisible2] = useState(false)
  const openModal2 = () => {
    setVisible2(true)
  }
  const closeModal2 = () => {
    setVisible2(false)
  }

  const [overlap2, setOverlap2] = useState()

  const signup = () => {
    if (id && pass) {
      http.post('/user/signup', {
        accountId: id,
        password: pass
      })
      .then(res => {
        setOverlap2(false)
        openModal2()
        navigation.replace('LocalLogin')
      })
      .catch(err => {
        setOverlap2(true)
        openModal2()
      })
    }
  }

  return (
    <View style={{ backgroundColor: '#FFF9F8', flex: 1 }}>
      <View style={{ flex:0.2 }} />
      <View style={{ alignItems: 'center', flex: 0.4, justifyContent: 'center' }}>
        <Image source={logo} style={{ width: 150, height: 150 }} />
        <View>
          <Text style={{ fontSize: 30, fontFamily: 'GangwonEduAllBold' }}>마시멜로일기</Text>
        </View>
      </View>

      <View style={{ flex: 0.4, justifyContent: 'center', alignItems: 'center', marginLeft: '10%', marginRight: '10%' }}>
        <Input placeholder="Id" onChangeText={text => setId(text)} />
        <TouchableOpacity onPress={idcheck} >
          <Text style={{ fontFamily:'GangwonEduAllBold'}}>중복확인</Text>
        </TouchableOpacity>

        <Modal visible={visible} setVisible={setVisible} transparent={true} animationType={'fade'}>
          <Pressable style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={closeModal}>
            <View style={{ flex: 0.2, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', width: '80%', borderRadius: 30 }}>
              { overlap ? 
                <Text style={{ fontFamily:'GangwonEduAllBold'}} >
                  이미 존재하는 ID 입니다. 
                </Text>
                :
                <Text style={{ fontFamily:'GangwonEduAllBold'}} >
                  사용 가능한 ID 입니다. 
                </Text>
              }      
            </View>
          </Pressable>
        </Modal>

        <Input
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={text => setPass(text)}
        />
        <TouchableOpacity onPress={signup}>
          <Text style={{ fontFamily:'GangwonEduAllBold'}}>가입하기</Text>
        </TouchableOpacity>

        <Modal visible={visible2} setVisible={setVisible2} transparent={true} animationType={'fade'}>
          <Pressable style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={closeModal2}>
            <View style={{ flex: 0.2, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', width: '80%', borderRadius: 30 }}>
              { overlap2 ? 
                <Text style={{ fontFamily:'GangwonEduAllBold'}} >
                  이미 존재하는 ID 입니다. 
                </Text>
                :
                <Text style={{ fontFamily:'GangwonEduAllBold'}} >
                  회원가입에 성공했습니다.
                </Text>
              }      
            </View>
          </Pressable>
        </Modal>

      </View>
    </View>
  )
}

export default SignUp