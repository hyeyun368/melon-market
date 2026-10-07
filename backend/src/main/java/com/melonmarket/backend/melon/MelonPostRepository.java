package com.melonmarket.backend.melon;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MelonPostRepository extends JpaRepository<MelonPost, Long> {

	List<MelonPost> findAllByOrderByCreatedAtDescIdDesc();

}
