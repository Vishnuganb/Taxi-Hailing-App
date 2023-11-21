package com.vishnugan.ride.config;

import com.vishnugan.ride.dto.PassengerRequestedRideEventDTO;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.serialization.StringSerializer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.core.DefaultKafkaProducerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.core.ProducerFactory;
import org.springframework.kafka.support.converter.StringJsonMessageConverter;
import org.springframework.kafka.support.serializer.JsonSerializer;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class KafkaProducerConfig {

    @Value("${spring.kafka.bootstrap-servers}")
    private String bootstrapServers;

    public Map<String, Object> producerConfig() {
        Map<String, Object> props = new HashMap<>();
        props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
        props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        // Use JsonSerializer for custom objects
        props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);

        return props;
    }

    @Bean
    public ProducerFactory<String, PassengerRequestedRideEventDTO> producerFactory() {
        return new DefaultKafkaProducerFactory<>(producerConfig());
    }

//    @Bean
//    public KafkaTemplate<String, PassengerRequestedRideEventDTO> kafkaTemplate(
//            ProducerFactory<String, PassengerRequestedRideEventDTO> producerFactory
//    ) {
//        return new KafkaTemplate<>(producerFactory);
//    }

    @Bean
    public KafkaTemplate<String, PassengerRequestedRideEventDTO> kafkaTemplate(
            ProducerFactory<String, PassengerRequestedRideEventDTO> producerFactory
    ) {
        KafkaTemplate<String, PassengerRequestedRideEventDTO> kafkaTemplate =
                new KafkaTemplate<>(producerFactory);
        kafkaTemplate.setMessageConverter(new StringJsonMessageConverter());
        return kafkaTemplate;
    }



}
