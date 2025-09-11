package com.luv2code.spring_boot_library.service;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.luv2code.spring_boot_library.dao.MessageRepository;
import com.luv2code.spring_boot_library.entity.Message;
import com.luv2code.spring_boot_library.requestmodels.AdminQuestionRequest;

@Service
@Transactional
public class MessagesService {

    private MessageRepository messageRepository;

    public MessagesService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    //postMessage：普通用户提交问题
    public void postMessage(Message messageRequest, String userEmail) {
        Message message = new Message(messageRequest.getTitle(), messageRequest.getQuestion());
        message.setUserEmail(userEmail);
        messageRepository.save(message);
    }

    //putMessage：管理员回复并关闭工单
    public void putMessage(AdminQuestionRequest adminQuestionRequest, String userEmail) throws Exception {
        // 1) 根据前端传来的 message id 查询
        Optional<Message> message = messageRepository.findById(adminQuestionRequest.getId());
        if (!message.isPresent()){
            throw new Exception("Message not found");
        }
        // 2) 写入管理员回复信息
        message.get().setAdminEmail(userEmail);// 回复人（从 JWT 取）
        message.get().setResponse(adminQuestionRequest.getResponse());// 回复内容
        message.get().setClosed(true); // 置为“已关闭”
        // 3) 持久化 -> UPDATE（id 非空时）
        messageRepository.save(message.get());
    }
}