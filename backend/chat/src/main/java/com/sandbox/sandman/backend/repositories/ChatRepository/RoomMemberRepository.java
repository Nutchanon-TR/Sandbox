package com.sandbox.sandman.backend.repositories.ChatRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sandbox.sandman.backend.model.entity.ChatEntity.RoomMember;
import com.sandbox.sandman.backend.model.entity.ChatEntity.RoomMemberId;

import java.util.List;

@Repository
public interface RoomMemberRepository extends JpaRepository<RoomMember, RoomMemberId> {
    List<RoomMember> findByIdRoomId(Long roomId);

    List<RoomMember> findByIdUserId(Long userId);
}
